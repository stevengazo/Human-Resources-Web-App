import { createContext, useContext, useEffect, useState } from 'react';
import apiClient from '../api/apiClient';
import {
  refreshRequest,
  logoutRequest,
  selectCompanyRequest,
  createCompanyRequest,
} from '../api/authApi';

/**
 * =====================================================
 * AppContext
 * =====================================================
 *
 * La sesión ya no vive en `localStorage` — el JWT va en una cookie httpOnly
 * que JavaScript no puede leer (ver `apiClient.js` y
 * `AuthenticationController`). Por eso no hay un `token` que decodificar
 * aquí: los roles y la empresa activa llegan siempre en el cuerpo de la
 * respuesta del propio servidor (login, select-company o refresh), nunca
 * inferidos del lado del cliente.
 *
 * Como el token no se puede leer de entrada, tampoco se puede saber
 * "¿sigo logueado?" de forma síncrona al cargar la página: hay que
 * preguntarle al servidor (`refreshRequest`). Mientras esa respuesta no
 * llega, `authLoading` queda en `true` — las rutas protegidas deben esperar
 * a que baje antes de decidir si redirigen a `/login` (ver `ManagerLayout`).
 */
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [company, setCompany] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  /**
   * Cuando el login detecta que la cuenta tiene más de una empresa, queda
   * "a medias" aquí (la lista para elegir) en vez de completarse: todavía no
   * hay rol ni empresa activa, así que `isAuthenticated` sigue en falso.
   */
  const [pendingCompanies, setPendingCompanies] = useState(null);

  /** Aplica lo que devuelve el servidor tras login / select-company / refresh. */
  const aplicarSesion = (data) => {
    setUser(data.user ?? null);
    setRoles(data.user?.roles ?? []);
    setCompany(data.company ?? null);
    setPendingCompanies(null);
    setIsAuthenticated(true);
  };

  const limpiarSesion = () => {
    setUser(null);
    setRoles([]);
    setCompany(null);
    setPendingCompanies(null);
    setIsAuthenticated(false);
  };

  /**
   * Al arrancar la app, la única forma de saber si hay una sesión vigente es
   * preguntarle al servidor: intenta renovarla con la cookie de refresco (si
   * no hay ninguna, o ya venció, el 401 deja todo como "no autenticado").
   */
  useEffect(() => {
    refreshRequest()
      .then(({ data }) => aplicarSesion(data))
      .catch(() => limpiarSesion())
      .finally(() => setAuthLoading(false));
  }, []);

  /** Si el refresco automático de una petición fallida no puede renovar la sesión, se cierra del todo. */
  useEffect(() => {
    apiClient.onSessionExpired = () => limpiarSesion();
    return () => {
      apiClient.onSessionExpired = null;
    };
  }, []);

  /**
   * =====================================================
   * login
   * =====================================================
   * `data` es la respuesta completa de `/Authentication/login` (o de
   * `select-company`): el token ya quedó puesto en la cookie por el
   * servidor, esto solo refleja lo demás en el estado de React.
   */
  const login = async (data) => {
    aplicarSesion(data);
  };

  /**
   * Primer paso del login cuando la cuenta tiene más de una empresa: no hay
   * sesión completa todavía (la cookie que dejó el servidor es "de solo
   * identidad"), solo la lista para que `selectCompany` confirme cuál usar.
   */
  const beginCompanySelection = (companies) => {
    setPendingCompanies(companies);
  };

  /** Confirma la empresa elegida y completa el login. */
  const selectCompany = async (companyId) => {
    const { data } = await selectCompanyRequest(companyId);
    aplicarSesion(data);
    return data;
  };

  /** Crea un espacio de trabajo adicional (desde el selector) y entra directo en él. */
  const createCompany = async (companyName) => {
    const { data } = await createCompanyRequest(companyName);
    aplicarSesion(data);
    return data;
  };

  /**
   * =====================================================
   * logout
   * =====================================================
   */
  const logout = () => {
    limpiarSesion();
    // No se espera la respuesta: la sesión local se cierra igual aunque la
    // petición falle (por ejemplo, sin conexión).
    logoutRequest().catch(() => {});
  };

  /**
   * =====================================================
   * Helpers de autorización
   * =====================================================
   */

  const hasRole = (role) => roles.includes(role);

  const hasAnyRole = (allowedRoles) =>
    allowedRoles.some((r) => roles.includes(r));

  return (
    <AppContext.Provider
      value={{
        user,
        roles,
        isAuthenticated,
        authLoading,
        company,
        pendingCompanies,
        login,
        logout,
        setUser,
        hasRole,
        hasAnyRole,
        beginCompanySelection,
        selectCompany,
        createCompany,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

/**
 * =====================================================
 * useAppContext
 * =====================================================
 */
export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext debe usarse dentro de AppProvider');
  }

  return context;
};

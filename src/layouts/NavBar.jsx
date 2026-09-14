import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Banknote,
  Brain,
  ChevronDown,
  FileText,
  LogOut,
  Menu,
  MessagesSquare,
  PanelsTopLeft,
  Percent,
  Target,
  User,
  X,
} from 'lucide-react';

import ThemeToggle from '../Components/ThemeToggle';
import Logo from '../Components/Logo';
import EmployeeAvatar from '../Components/molecules/EmployeeAvatar';
import { obtenerFoto } from '../Components/organisms/AvatarUpload';
import { urlDeArchivo } from '../utils/fileUrl';
import { useAppContext } from '../context/AppContext';
import useUnreadMessages from '../hooks/useUnreadMessages';
import CompanySwitcher from '../Components/molecules/CompanySwitcher';

/**
 * Secciones del portal del colaborador.
 *
 * Cada una lleva su propio icono: antes las cinco usaban el mismo `User`, lo
 * que hacía imposible distinguirlas de un vistazo.
 */
const SECCIONES = [
  { to: '/my-profile', label: 'Mi perfil', icon: User },
  { to: '/messages', label: 'Mensajes', icon: MessagesSquare },
  { to: '/my-kpis', label: 'KPIs', icon: Target },
  { to: '/my-evaluations', label: 'Evaluaciones', icon: Brain },
  { to: '/my-comissions', label: 'Comisiones', icon: Percent },
  { to: '/my-loans', label: 'Préstamos', icon: Banknote },
  { to: '/my-payrolls', label: 'Comprobantes', icon: FileText },
];

/* La barra vive sobre `surface`, no sobre el degradado oscuro de antes, así
   que los enlaces usan los tokens de texto en vez de blancos fijos. */
const linkClass = ({ isActive }) =>
  `flex items-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium
   transition-colors duration-150
   ${
     isActive
       ? 'bg-brand-tint text-brand-700'
       : 'text-ink-secondary hover:bg-canvas hover:text-ink'
   }`;

/* El cajón móvil sí conserva el fondo oscuro, y ahí el contraste se invierte. */
const linkClassOscuro = ({ isActive }) =>
  `flex items-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium
   transition-colors duration-150
   ${
     isActive
       ? 'bg-white/15 text-white'
       : 'text-gray-300 hover:bg-white/10 hover:text-white'
   }`;

/** Iniciales del usuario en sesión. */
const iniciales = (user) => {
  const nombre = [user?.firstName, user?.lastName].filter(Boolean).join(' ');
  if (nombre) {
    return nombre
      .split(' ')
      .slice(0, 2)
      .map((p) => p[0])
      .join('')
      .toUpperCase();
  }
  return (user?.userName || user?.email || '?').slice(0, 2).toUpperCase();
};

const nombreVisible = (user) =>
  [user?.firstName, user?.lastName].filter(Boolean).join(' ') ||
  user?.userName ||
  user?.email ||
  'Mi cuenta';

const NavBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, hasRole, logout } = useAppContext();

  const [menuMovil, setMenuMovil] = useState(false);
  const [menuUsuario, setMenuUsuario] = useState(false);
  const [foto, setFoto] = useState(null);
  const refUsuario = useRef(null);
  const { total: mensajesNoLeidos } = useUnreadMessages();

  /** Distintivo de no leídos para el enlace de Mensajes. */
  const badgeDe = (to) =>
    to === '/messages' && mensajesNoLeidos > 0 ? (
      <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">
        {mensajesNoLeidos > 99 ? '99+' : mensajesNoLeidos}
      </span>
    ) : null;

  // Foto de perfil del usuario en sesión
  useEffect(() => {
    let vigente = true;
    if (!user?.id) return setFoto(null);

    obtenerFoto(user.id).then((archivo) => {
      if (vigente) setFoto(urlDeArchivo(archivo?.filePath));
    });

    return () => {
      vigente = false;
    };
  }, [user?.id]);

  // Cierra el menú de usuario al hacer clic fuera o pulsar Escape
  useEffect(() => {
    if (!menuUsuario) return;

    const alClicar = (e) => {
      if (!refUsuario.current?.contains(e.target)) setMenuUsuario(false);
    };
    const alTeclear = (e) => {
      if (e.key === 'Escape') setMenuUsuario(false);
    };

    document.addEventListener('mousedown', alClicar);
    document.addEventListener('keydown', alTeclear);
    return () => {
      document.removeEventListener('mousedown', alClicar);
      document.removeEventListener('keydown', alTeclear);
    };
  }, [menuUsuario]);

  // Al navegar se cierra todo
  useEffect(() => {
    setMenuMovil(false);
    setMenuUsuario(false);
  }, [pathname]);

  /* Antes solo navegaba a "/" y dejaba el token en localStorage: la sesión
     seguía viva y bastaba volver atrás para entrar de nuevo. */
  const cerrarSesion = () => {
    logout?.();
    navigate('/login');
  };

  return (
    <>
      <motion.nav
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex h-16 items-center justify-between gap-4 border-b border-stroke-soft
                   bg-surface px-4 sm:px-6"
      >
        {/* Marca — la misma que usa el resto del sistema */}
        <NavLink
          to="/my-profile"
          className="shrink-0 rounded-md focus-visible:outline-none
                     focus-visible:ring-2 focus-visible:ring-brand"
        >
          <Logo size={30} sobre="claro" className="hidden sm:flex" />
          <Logo variante="iso" size={30} className="sm:hidden" />
        </NavLink>

        {/* Navegación de escritorio */}
        <div className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {hasRole('Admin') && (
            <NavLink to="/manager" className={linkClass}>
              <PanelsTopLeft size={17} />
              Administración
            </NavLink>
          )}

          {SECCIONES.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={linkClass}>
              <Icon size={17} />
              {label}
              {badgeDe(to)}
            </NavLink>
          ))}
        </div>

        {/* Acciones */}
        <div className="flex shrink-0 items-center gap-1">
          <div className="hidden lg:block">
            <CompanySwitcher />
          </div>

          <ThemeToggle variant="light" />

          {/* Menú de usuario (escritorio) */}
          <div className="relative hidden lg:block" ref={refUsuario}>
            <button
              type="button"
              onClick={() => setMenuUsuario((v) => !v)}
              aria-expanded={menuUsuario}
              aria-haspopup="menu"
              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-ink-secondary
                         transition-colors hover:bg-canvas hover:text-ink
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <EmployeeAvatar
                src={foto}
                iniciales={iniciales(user)}
                size="xs"
                className="bg-brand-tint text-brand ring-0"
              />
              <span className="max-w-36 truncate font-medium">
                {nombreVisible(user)}
              </span>
              <ChevronDown
                size={15}
                className={`transition-transform ${menuUsuario ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {menuUsuario && (
                <motion.div
                  role="menu"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl
                             border border-stroke-soft bg-surface shadow-xl"
                >
                  <div className="border-b border-stroke-soft px-4 py-3">
                    <p className="truncate text-sm font-semibold text-ink">
                      {nombreVisible(user)}
                    </p>
                    {user?.email && (
                      <p className="truncate text-xs text-ink-muted">
                        {user.email}
                      </p>
                    )}
                  </div>

                  <NavLink
                    to="/my-profile"
                    role="menuitem"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink-secondary
                               transition-colors hover:bg-canvas hover:text-ink"
                  >
                    <User size={16} />
                    Ver mi perfil
                  </NavLink>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={cerrarSesion}
                    className="flex w-full items-center gap-2.5 border-t border-stroke-soft px-4 py-2.5
                               text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                  >
                    <LogOut size={16} />
                    Cerrar sesión
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Menú móvil */}
          <button
            type="button"
            onClick={() => setMenuMovil(true)}
            aria-label="Abrir menú"
            className="grid h-9 w-9 place-items-center rounded-md text-ink-muted
                       transition-colors hover:bg-canvas hover:text-ink lg:hidden"
          >
            <Menu size={22} />
          </button>
        </div>
      </motion.nav>

      {/* Cajón móvil */}
      <AnimatePresence>
        {menuMovil && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuMovil(false)}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed inset-y-0 right-0 z-50 flex w-72 flex-col
                         bg-linear-to-b from-nav via-nav to-violet-950 p-5 shadow-xl lg:hidden"
            >
              {/* Identidad */}
              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <EmployeeAvatar
                    src={foto}
                    iniciales={iniciales(user)}
                    size="sm"
                    className="bg-white/15 text-white ring-0"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {nombreVisible(user)}
                    </p>
                    {user?.email && (
                      <p className="truncate text-xs text-gray-400">
                        {user.email}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMenuMovil(false)}
                  aria-label="Cerrar menú"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-md text-gray-300
                             transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="mb-5">
                <CompanySwitcher dark />
              </div>

              <nav className="flex flex-col gap-1">
                {hasRole('Admin') && (
                  <NavLink to="/manager" className={linkClassOscuro}>
                    <PanelsTopLeft size={17} />
                    Administración
                  </NavLink>
                )}

                {SECCIONES.map(({ to, label, icon: Icon }) => (
                  <NavLink key={to} to={to} className={linkClassOscuro}>
                    <Icon size={17} />
                    {label}
                    {badgeDe(to)}
                  </NavLink>
                ))}
              </nav>

              <button
                type="button"
                onClick={cerrarSesion}
                className="mt-auto flex items-center gap-2.5 rounded-md bg-red-500/10 px-3 py-2
                           text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20"
              >
                <LogOut size={17} />
                Cerrar sesión
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;

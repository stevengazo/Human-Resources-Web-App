import apiClient from './apiClient';

/**
 * Realiza una solicitud de autenticación (login).
 *
 * @function loginRequest
 * @param {Object} credentials - Credenciales del usuario.
 * @param {string} credentials.email - Correo electrónico del usuario.
 * @param {string} credentials.password - Contraseña del usuario.
 *
 * @returns {Promise} Promesa con la respuesta del servidor.
 * - En caso de éxito devuelve los datos del usuario y/o token de autenticación.
 * - En caso de error devuelve el error correspondiente.
 */
const loginRequest = (credentials) => {
  return apiClient.post('/Authentication/login', credentials);
};

/**
 * Realiza una solicitud de registro de usuario.
 *
 * @function registerRequest
 * @param {Object} registerUser - Datos del nuevo usuario.
 * @param {string} registerUser.name - Nombre completo del usuario.
 * @param {string} registerUser.email - Correo electrónico del usuario.
 * @param {string} registerUser.password - Contraseña del usuario.
 *
 * @returns {Promise} Promesa con la respuesta del servidor.
 * - En caso de éxito devuelve el usuario creado.
 * - En caso de error devuelve el detalle del error.
 */
const registerRequest = (registerUser) => {
  return apiClient.post('/Authentication/register', registerUser);
};

/**
 * Segundo paso del login cuando la cuenta pertenece a más de una empresa:
 * confirma con cuál se quiere entrar. La cuenta ya quedó identificada por la
 * cookie que dejó `loginRequest` — no hace falta mandar nada más.
 *
 * @param {number} companyId
 */
const selectCompanyRequest = (companyId) => {
  return apiClient.post('/Authentication/select-company', { companyId });
};

/**
 * Empresas a las que pertenece la sesión activa, para el selector de
 * empresa sin tener que cerrar sesión del todo.
 */
const myCompaniesRequest = () => {
  return apiClient.get('/Authentication/my-companies');
};

/**
 * Renueva la sesión a partir de la cookie de refresco, sin pedir contraseña.
 * También sirve como el "¿sigo logueado?" al arrancar la app: el token de
 * acceso vive en una cookie httpOnly que JavaScript no puede leer, así que
 * esta es la única forma de saber si hay una sesión vigente.
 */
const refreshRequest = () => {
  return apiClient.post('/Authentication/refresh');
};

/** Cierra la sesión: revoca el refresh token en el servidor y limpia las cookies. */
const logoutRequest = () => {
  return apiClient.post('/Authentication/logout');
};

/**
 * Inicia sesión o registra una cuenta con el id_token que devuelve Google
 * Identity Services. `companyName` solo hace falta cuando el backend responde
 * `requiresCompanyName` (cuenta de Google que no matchea ninguna existente).
 */
const googleAuthRequest = ({ idToken, companyName }) => {
  return apiClient.post('/Authentication/google', { idToken, companyName });
};

/** Vincula Google a la sesión ya iniciada (perfil → "Cuentas vinculadas"). */
const linkGoogleRequest = (idToken) => {
  return apiClient.post('/Authentication/google/link', { idToken });
};

/** Desvincula Google de la sesión activa. */
const unlinkGoogleRequest = () => {
  return apiClient.post('/Authentication/google/unlink');
};

/** Proveedores externos vinculados a la sesión activa y si tiene contraseña. */
const getExternalLoginsRequest = () => {
  return apiClient.get('/Authentication/external-logins');
};

/** Establece una contraseña para cuentas creadas sin una (solo con Google). */
const setPasswordRequest = (newPassword) => {
  return apiClient.post('/Authentication/set-password', { newPassword });
};

/**
 * Crea un espacio de trabajo adicional para la cuenta ya identificada (la
 * cookie de identidad alcanza, no hace falta tener una empresa activa) y
 * devuelve la sesión completa en esa empresa nueva.
 */
const createCompanyRequest = (companyName) => {
  return apiClient.post('/Authentication/create-company', { companyName });
};

export {
  loginRequest,
  registerRequest,
  selectCompanyRequest,
  myCompaniesRequest,
  refreshRequest,
  logoutRequest,
  googleAuthRequest,
  linkGoogleRequest,
  unlinkGoogleRequest,
  getExternalLoginsRequest,
  setPasswordRequest,
  createCompanyRequest,
};

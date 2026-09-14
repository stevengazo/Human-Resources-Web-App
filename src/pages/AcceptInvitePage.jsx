import { motion } from 'framer-motion';
import { Lock, Mail, User, UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import {
  acceptInviteRequest,
  getInvitePreviewRequest,
} from '../api/invitationsApi';
import { mensajeDeError } from '../utils/apiError';

const CLAVE_INVITACION_PENDIENTE = 'rh:pending-invite';

/**
 * Pantalla pública del link de invitación (`/invite/:token`). Dos caminos,
 * según si el correo invitado ya tenía cuenta:
 *
 * - Sin cuenta: registro simplificado (nombre + contraseña, correo fijo) que
 *   crea la cuenta directo en esa empresa — mismo patrón que `Register`, que
 *   tampoco abre sesión sola: siempre se entra por `/login` después.
 * - Con cuenta: hay que probar que es suya iniciando sesión primero. El
 *   token queda en `sessionStorage` y `SelectCompanyPage` lo consume apenas
 *   la sesión esté lista (ahí es donde cae cualquier login).
 */
const AcceptInvitePage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [cargando, setCargando] = useState(true);
  const [preview, setPreview] = useState(null); // { email, companyName, accountExists }
  const [errorPreview, setErrorPreview] = useState('');

  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getInvitePreviewRequest(token)
      .then(({ data }) => setPreview(data))
      .catch((err) =>
        setErrorPreview(
          mensajeDeError(err, 'Esta invitación no existe o ya no está vigente.')
        )
      )
      .finally(() => setCargando(false));
  }, [token]);

  const irAIniciarSesion = () => {
    sessionStorage.setItem(CLAVE_INVITACION_PENDIENTE, token);
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setEnviando(true);
    try {
      await acceptInviteRequest({ token, firstName, password });
      toast.success('Cuenta creada. Ya puedes iniciar sesión.');
      navigate('/login');
    } catch (err) {
      setError(mensajeDeError(err, 'No se pudo aceptar la invitación.'));
      setEnviando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-violet-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-slate-800 text-white rounded-2xl shadow-xl p-8"
      >
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <UserPlus size={40} className="text-brand" />
          </div>
          <h3 className="text-2xl font-semibold">Invitación</h3>
        </div>

        {cargando && (
          <p className="text-center text-sm text-slate-400">Verificando invitación…</p>
        )}

        {!cargando && errorPreview && (
          <div className="text-center space-y-4">
            <p className="text-sm text-red-400">{errorPreview}</p>
            <NavLink
              to="/login"
              className="inline-block text-sm text-brand hover:underline"
            >
              Ir a iniciar sesión
            </NavLink>
          </div>
        )}

        {!cargando && preview && (
          <>
            <p className="mb-6 text-center text-sm text-slate-300">
              Te invitaron a unirte a{' '}
              <span className="font-semibold text-white">{preview.companyName}</span>{' '}
              con el correo <span className="font-semibold text-white">{preview.email}</span>.
            </p>

            {error && (
              <p className="mb-4 text-sm text-red-400 text-center">{error}</p>
            )}

            {preview.accountExists ? (
              <div className="space-y-4">
                <p className="text-center text-sm text-slate-300">
                  Ya tienes una cuenta con este correo. Inicia sesión para unirte.
                </p>
                <button
                  type="button"
                  onClick={irAIniciarSesion}
                  className="w-full flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover text-white py-2 rounded-lg font-medium transition"
                >
                  Iniciar sesión y unirme
                </button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Correo</label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-2.5 text-slate-400"
                      size={18}
                    />
                    <input
                      type="text"
                      value={preview.email}
                      disabled
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-700/60 border border-slate-600 text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-1">Nombre</label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-2.5 text-slate-400"
                      size={18}
                    />
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Tu nombre"
                      required
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-brand"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-1">Contraseña</label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-2.5 text-slate-400"
                      size={18}
                    />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={6}
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-brand"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={enviando}
                  className="w-full mt-2 flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover disabled:opacity-60 text-white py-2 rounded-lg font-medium transition"
                >
                  <UserPlus size={18} />
                  {enviando ? 'Creando cuenta…' : 'Unirme a la empresa'}
                </motion.button>
              </form>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default AcceptInvitePage;

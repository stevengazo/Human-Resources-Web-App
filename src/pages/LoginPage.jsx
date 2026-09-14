import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Building2 } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { useAppContext } from '../context/AppContext';
import { loginRequest, googleAuthRequest } from '../api/authApi';
import GoogleButton from '../Components/molecules/GoogleButton';

const LoginPage = () => {
  const navigate = useNavigate();
  const { beginCompanySelection } = useAppContext();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Cuenta de Google sin empresa todavía: guarda el idToken mientras se pide
  // el nombre de la empresa antes de reintentar.
  const [pendingGoogleToken, setPendingGoogleToken] = useState(null);
  const [googleCompanyName, setGoogleCompanyName] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);

  /**
   * Todo login (usuario/contraseña, Google, invitación aceptada...) termina
   * siempre en el selector de espacio de trabajo — estilo Bitrix24, aunque
   * la cuenta tenga una sola empresa. La cookie "de solo identidad" ya la
   * dejó el servidor.
   */
  const irAlSelector = (data) => {
    beginCompanySelection(data.companies);
    navigate('/select-company');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await loginRequest({ username, password });
      irAlSelector(data);
    } catch (err) {
      console.error(err);
      setError('Usuario o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleCredential = async (idToken) => {
    setError('');
    setGoogleLoading(true);

    try {
      const { data } = await googleAuthRequest({ idToken });

      if (data.requiresCompanyName) {
        setPendingGoogleToken(idToken);
        return;
      }

      irAlSelector(data);
    } catch (err) {
      console.error(err);
      setError('No se pudo iniciar sesión con Google');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleConfirmGoogleCompany = async (e) => {
    e.preventDefault();
    if (!pendingGoogleToken) return;

    setError('');
    setGoogleLoading(true);

    try {
      const { data } = await googleAuthRequest({
        idToken: pendingGoogleToken,
        companyName: googleCompanyName,
      });
      irAlSelector(data);
    } catch (err) {
      console.error(err);
      setError('No se pudo crear la cuenta con Google');
    } finally {
      setGoogleLoading(false);
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
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <LogIn size={40} className="text-brand" />
          </div>
          <h3 className="text-2xl font-semibold">Iniciar sesión</h3>
          <p className="text-slate-400 text-sm">Accede a tu cuenta</p>
        </div>

        {/* Error */}
        {error && (
          <p className="mb-4 text-sm text-red-400 text-center">{error}</p>
        )}

        {pendingGoogleToken ? (
          /* Cuenta de Google nueva: hace falta el nombre de la empresa antes de crearla. */
          <form className="space-y-4" onSubmit={handleConfirmGoogleCompany}>
            <p className="text-sm text-slate-300 text-center">
              Vamos a crear tu cuenta con Google. ¿Cómo se llama tu empresa?
            </p>
            <div>
              <label className="block text-sm text-slate-300 mb-1">
                Nombre de la empresa
              </label>
              <div className="relative">
                <Building2
                  className="absolute left-3 top-2.5 text-slate-400"
                  size={18}
                />
                <input
                  type="text"
                  value={googleCompanyName}
                  onChange={(e) => setGoogleCompanyName(e.target.value)}
                  placeholder="Mi Empresa S.A."
                  required
                  autoFocus
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={googleLoading}
              className="w-full mt-2 flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover disabled:opacity-60 text-white py-2 rounded-lg font-medium transition"
            >
              {googleLoading ? 'Creando...' : 'Continuar'}
            </motion.button>
            <button
              type="button"
              onClick={() => setPendingGoogleToken(null)}
              className="w-full text-center text-sm text-slate-400 hover:underline"
            >
              Cancelar
            </button>
          </form>
        ) : (
          <>
            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Usuario */}
              <div>
                <label className="block text-sm text-slate-300 mb-1">
                  Usuario o correo
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-2.5 text-slate-400"
                    size={18}
                  />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="usuario@empresa.com"
                    required
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div>
                <label className="block text-sm text-slate-300 mb-1">
                  Contraseña
                </label>
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
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
              </div>

              {/* Botón */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className="w-full mt-2 flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover disabled:opacity-60 text-white py-2 rounded-lg font-medium transition"
              >
                <LogIn size={18} />
                {loading ? 'Ingresando...' : 'Entrar'}
              </motion.button>
            </form>

            <div className="flex items-center gap-3 my-5">
              <div className="h-px flex-1 bg-slate-600" />
              <span className="text-xs text-slate-400">o</span>
              <div className="h-px flex-1 bg-slate-600" />
            </div>

            <GoogleButton text="signin_with" onCredential={handleGoogleCredential} />
          </>
        )}

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-slate-400 space-y-1">
          <p>
            ¿No tienes cuenta?{' '}
            <NavLink to="/register" className="text-brand hover:underline">
              Regístrate
            </NavLink>
          </p>
          <p className="text-xs">© 2025 — Sistema de Recursos Humanos</p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;

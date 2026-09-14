import { motion } from 'framer-motion';
import { Mail, Lock, UserPlus, Building2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { registerRequest, googleAuthRequest } from '../api/authApi';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import GoogleButton from '../Components/molecules/GoogleButton';

const RegisterPage = () => {
  const Nav = useNavigate();
  const { beginCompanySelection } = useAppContext();
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    companyName: '',
  });
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerRequest({
        ...newUser,
        username: newUser.email, // se mantiene así 👍
      });

      toast.success('Usuario creado correctamente');
      Nav('/login');
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        Object.values(error.response?.data?.errors || {})?.[0]?.[0] ||
        'Error al registrar usuario';

      toast.error(msg);
      console.error(error);
    }
  };

  const handleGoogleCredential = async (idToken) => {
    if (!newUser.companyName.trim()) {
      toast.error('Escribe primero el nombre de tu empresa');
      return;
    }

    setGoogleLoading(true);
    try {
      const { data } = await googleAuthRequest({
        idToken,
        companyName: newUser.companyName,
      });

      // Login/registro con Google siempre termina en el selector de
      // espacio de trabajo (ver LoginPage), aunque sea el único.
      beginCompanySelection(data.companies);
      Nav('/select-company');
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.response?.data ||
        'No se pudo crear la cuenta con Google';
      toast.error(typeof msg === 'string' ? msg : 'No se pudo crear la cuenta con Google');
      console.error(error);
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
            <UserPlus size={40} className="text-brand" />
          </div>
          <h3 className="text-2xl font-semibold">Crear tu empresa</h3>
          <p className="text-slate-400 text-sm">
            Esta cuenta queda como administradora de la empresa
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Empresa */}
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
                name="companyName"
                type="text"
                value={newUser.companyName}
                onChange={handleChange}
                placeholder="Mi Empresa S.A."
                required
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Correo electrónico
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-2.5 text-slate-400"
                size={18}
              />
              <input
                name="email"
                type="email"
                value={newUser.email}
                onChange={handleChange}
                placeholder="correo@empresa.com"
                required
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
          </div>

          {/* Password */}
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
                name="password"
                type="password"
                value={newUser.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full mt-2 flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover text-white py-2 rounded-lg font-medium transition"
          >
            <UserPlus size={18} />
            Registrarse
          </motion.button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="h-px flex-1 bg-slate-600" />
          <span className="text-xs text-slate-400">o</span>
          <div className="h-px flex-1 bg-slate-600" />
        </div>

        {googleLoading ? (
          <p className="text-center text-sm text-slate-400">Creando cuenta...</p>
        ) : (
          <GoogleButton text="signup_with" onCredential={handleGoogleCredential} />
        )}
        <p className="mt-2 text-center text-xs text-slate-500">
          Completa el nombre de la empresa arriba antes de usar Google.
        </p>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-400">
          ¿Ya tienes cuenta?{' '}
          <NavLink to="/login" className="text-brand hover:underline">
            Inicia sesión
          </NavLink>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;

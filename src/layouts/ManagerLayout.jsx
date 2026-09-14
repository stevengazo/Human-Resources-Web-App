import { Outlet, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ManagerSideBar from './ManagerSideBar';
import { useAppContext } from '../context/AppContext';
import TopbarSearch from '../Components/organisms/TopbarSearch';
import ThemeToggle from '../Components/ThemeToggle';
import Logo from '../Components/Logo';
import NotificationsPanel from '../Components/organisms/NotificationsPanel';
import ChatWidget from '../Components/organisms/messaging/ChatWidget';
import CompanySwitcher from '../Components/molecules/CompanySwitcher';

const ManagerLayout = () => {
  const { hasRole, isAuthenticated, authLoading } = useAppContext();

  /* La sesión ya no se puede leer de entrada (el token vive en una cookie
     httpOnly): hay que esperar la respuesta de `AppContext` antes de decidir
     si redirige, o cualquier refresco de página mandaría a /login de más. */
  if (authLoading) {
    return null;
  }

  // 🔐 Si no está autenticado → login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 🔐 Si no tiene rol admin → no autorizado
  if (!hasRole('Admin')) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Animaciones
  const mainVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.3 } },
  };

  return (
    <div className="flex h-screen bg-canvas overflow-hidden">
      {/* Sidebar */}
      <ManagerSideBar />

      {/* Main Area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <header
          className="h-16 bg-surface border-b border-stroke-soft
                     flex items-center gap-3 md:gap-6 px-4 md:px-6 shrink-0"
        >
          <h1 className="hidden shrink-0 text-base font-semibold text-ink sm:block">
            Panel de Gestión
          </h1>

          <CompanySwitcher />

          {/* Buscador global */}
          <div className="flex flex-1 justify-center md:justify-end">
            <TopbarSearch />
          </div>

          <NotificationsPanel />

          <ThemeToggle variant="light" />

          <Logo variante="iso" size={26} className="hidden shrink-0 lg:block" />
        </header>

        {/* Content */}
        <motion.main
          className="flex-1 min-h-0 bg-canvas overflow-y-auto p-4 md:p-6"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={mainVariants}
        >
          {/* Lienzo plano: el contenido de cada página trae su propio
              relieve donde hace falta. Encerrarlo además en una tarjeta con
              borde y sombra producía marcos dentro de marcos. */}
          <motion.div
            className="mx-auto w-full max-w-full md:max-w-6xl lg:max-w-7xl"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={cardVariants}
          >
            <Outlet />
          </motion.div>
        </motion.main>
      </div>

      <ChatWidget />
    </div>
  );
};

export default ManagerLayout;
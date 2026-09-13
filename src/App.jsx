import AppRouter from './router/AppRouter';
import { Toaster } from 'react-hot-toast';
import useUserPreferences from './hooks/useUserPreferences';

/** Carga y aplica la personalización del colaborador al entrar. Sin UI. */
function PreferencesLoader() {
  useUserPreferences();
  return null;
}

function App() {
  return (
    <>
      {/* Sin un <Helmet> "por defecto" aquí a propósito: react-helmet-async
          agrega sus propias etiquetas pero no borra las de otra instancia
          que siga montada, así que un <meta name="description"> puesto en
          este nivel (padre, nunca se desmonta) y otro en `Seo.jsx` (cada
          página pública) terminan coexistiendo como dos nodos — y el
          buscador, o `querySelector`, se queda con el primero, no con el
          más específico. Cada página pública pone el suyo con `<Seo>`; las
          privadas, detrás de login y fuera de robots.txt, no necesitan uno. */}
      <PreferencesLoader />
      <Toaster position="top-left" reverseOrder={false} />
      <AppRouter />
    </>
  );
}

export default App;

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { AppProvider } from './context/AppContext.jsx';
import './index.css';
import App from './App';
import { inicializarTema } from './hooks/useTheme';

/* El script de `index.html` ya pintó el tema; esto solo pone al día el store
   de React con lo que hay en el DOM, antes del primer render. */
inicializarTema();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </HelmetProvider>
  </StrictMode>
);

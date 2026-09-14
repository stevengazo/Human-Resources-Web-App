import { useEffect, useRef } from 'react';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

/**
 * Botón oficial de "Iniciar sesión con Google" (Google Identity Services).
 * Se reutiliza para login, registro y vinculación: el padre decide qué hacer
 * con el id_token en `onCredential`.
 *
 * No se tokeniza con el sistema Fluent del proyecto a propósito: Google exige
 * su propio look para este botón.
 *
 * Si no hay Client ID configurado (VITE_GOOGLE_CLIENT_ID vacío), no renderiza
 * nada — evita romper la pantalla mientras nadie configuró las credenciales.
 */
const GoogleButton = ({ onCredential, text = 'continue_with' }) => {
  const containerRef = useRef(null);
  const onCredentialRef = useRef(onCredential);
  onCredentialRef.current = onCredential;

  useEffect(() => {
    if (!clientId || !containerRef.current) return;

    let cancelado = false;

    const render = () => {
      if (cancelado || !window.google?.accounts?.id || !containerRef.current)
        return;

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => onCredentialRef.current?.(response.credential),
      });

      containerRef.current.innerHTML = '';
      window.google.accounts.id.renderButton(containerRef.current, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text,
        shape: 'rectangular',
        width: 320,
      });
    };

    if (window.google?.accounts?.id) {
      render();
    } else {
      // El script de Google (index.html) puede seguir cargando (async/defer).
      const interval = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(interval);
          render();
        }
      }, 100);
      return () => {
        cancelado = true;
        clearInterval(interval);
      };
    }

    return () => {
      cancelado = true;
    };
  }, [text]);

  if (!clientId) return null;

  return <div ref={containerRef} className="flex justify-center" />;
};

export default GoogleButton;

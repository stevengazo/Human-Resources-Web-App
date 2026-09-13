import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet, useLocation } from 'react-router-dom';
import PublicNavBar from '../Components/organisms/marketing/PublicNavBar';
import PublicFooter from '../Components/organisms/marketing/PublicFooter';
import { CASA_MATRIZ, PRODUCTO } from '../data/marketing';

/**
 * Dato estructurado (JSON-LD) para buscadores: qué es Planitica y quién lo
 * publica. Va una sola vez para todo el sitio público, no por página —
 * duplicarlo en cada ruta no aporta nada y algunos validadores lo marcan
 * como redundante.
 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: PRODUCTO.nombre,
  description: PRODUCTO.descripcion,
  url: PRODUCTO.dominio,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  brand: {
    '@type': 'Organization',
    name: CASA_MATRIZ.nombre,
    url: CASA_MATRIZ.url,
  },
  publisher: {
    '@type': 'Organization',
    name: CASA_MATRIZ.nombre,
    url: CASA_MATRIZ.url,
  },
};

/**
 * Shell del sitio público (marketing): barra de navegación + contenido + pie.
 *
 * Al navegar sube al inicio; si la URL trae `#ancla`, hace scroll a esa
 * sección compensando la altura de la barra fija.
 */
const PublicLayout = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const destino = document.getElementById(hash.slice(1));
      if (destino) {
        destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <PublicNavBar />

      <main className="flex-1">
        <Outlet />
      </main>

      <PublicFooter />
    </div>
  );
};

export default PublicLayout;

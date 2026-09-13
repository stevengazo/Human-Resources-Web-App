import { Helmet } from 'react-helmet-async';
import { PRODUCTO } from '../data/marketing';

/**
 * Metaetiquetas de una página del sitio público: título, descripción,
 * canónica y Open Graph/Twitter. Cada página de `pages/public/*` pone la
 * suya con su propio título y descripción reales — nunca genéricos, porque
 * son justo lo que un buscador muestra en el resultado.
 *
 * El título llega sin la marca: este componente agrega siempre
 * "· Planitica" al final, así ninguna página se olvida y no queda
 * duplicado si alguna ya la incluyera.
 *
 * @param {string} title - Título específico de la página (sin la marca).
 * @param {string} description - 1–2 frases reales sobre el contenido de esta página.
 * @param {string} path - Ruta desde la raíz, con la barra inicial (ej. "/precios").
 * @param {string} [image] - URL absoluta de la imagen para compartir en redes.
 */
const Seo = ({ title, description, path, image }) => {
  const tituloCompleto = `${title} · ${PRODUCTO.nombre}`;
  const url = `${PRODUCTO.dominio}${path}`;
  const imagenCompartir = image ?? `${PRODUCTO.dominio}/og-image.png`;

  return (
    <Helmet>
      <title>{tituloCompleto}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={PRODUCTO.nombre} />
      <meta property="og:locale" content="es_CR" />
      <meta property="og:title" content={tituloCompleto} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imagenCompartir} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={tituloCompleto} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imagenCompartir} />
    </Helmet>
  );
};

export default Seo;

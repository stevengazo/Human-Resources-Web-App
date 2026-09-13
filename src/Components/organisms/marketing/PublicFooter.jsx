import { Link } from 'react-router-dom';
import { Clock, Mail, MapPin, Phone, Users } from 'lucide-react';
import { CASA_MATRIZ, CONTACTO, PRODUCTO } from '../../../data/marketing';

const columnas = [
  {
    titulo: 'Producto',
    enlaces: [
      { to: '/caracteristicas', label: 'Características' },
      { to: '/como-funciona', label: 'Cómo funciona' },
      { to: '/precios', label: 'Precios' },
      { to: '/ui', label: 'Sistema de diseño' },
    ],
  },
  {
    titulo: 'Módulos',
    enlaces: [
      { to: '/caracteristicas#planilla', label: 'Planilla' },
      { to: '/caracteristicas#personal', label: 'Expediente digital' },
      { to: '/caracteristicas#desempeno', label: 'KPIs y desempeño' },
      { to: '/caracteristicas#portal', label: 'Portal del colaborador' },
    ],
  },
  {
    titulo: 'Acceso',
    enlaces: [
      { to: '/login', label: 'Iniciar sesión' },
      { to: '/register', label: 'Crear cuenta' },
      { to: '/contacto', label: 'Solicitar demo' },
    ],
  },
];

const PublicFooter = () => {
  const anio = new Date().getFullYear();

  return (
    <footer className="bg-nav text-gray-300">
      {/* Franja de acento azul → morado */}
      <div
        aria-hidden="true"
        className="h-1 w-full bg-linear-to-r from-brand to-accent"
      />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Marca + contacto */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span
                className="grid h-9 w-9 place-items-center rounded-lg
                           bg-linear-to-br from-brand to-accent text-white"
              >
                <Users size={20} />
              </span>
              <span className="text-lg font-bold text-white">
                {PRODUCTO.nombre}
              </span>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400">
              {PRODUCTO.descripcion}
            </p>

            <p className="mt-3 text-xs text-gray-500">
              Un producto de{' '}
              <a
                href={CASA_MATRIZ.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gray-400 transition-colors hover:text-white"
              >
                {CASA_MATRIZ.nombre}
              </a>
            </p>

            <ul className="mt-6 space-y-2.5 text-sm">
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="shrink-0 text-brand-300" />
                <a
                  href={`mailto:${CONTACTO.email}`}
                  className="transition-colors hover:text-white"
                >
                  {CONTACTO.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="shrink-0 text-brand-300" />
                <span>{CONTACTO.telefono}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={16} className="shrink-0 text-brand-300" />
                <span>{CONTACTO.ubicacion}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock size={16} className="shrink-0 text-brand-300" />
                <span>{CONTACTO.horario}</span>
              </li>
            </ul>
          </div>

          {/* Columnas de enlaces */}
          {columnas.map((columna) => (
            <nav key={columna.titulo} aria-label={columna.titulo}>
              <h2 className="text-xs font-bold uppercase tracking-widest text-white">
                {columna.titulo}
              </h2>

              <ul className="mt-4 space-y-2.5 text-sm">
                {columna.enlaces.map((enlace) => (
                  <li key={enlace.label}>
                    <Link
                      to={enlace.to}
                      className="text-gray-400 transition-colors hover:text-white"
                    >
                      {enlace.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div
          className="mt-12 flex flex-col items-center justify-between gap-3
                     border-t border-white/10 pt-6 text-xs text-gray-500 sm:flex-row"
        >
          <p>
            © {anio} {CASA_MATRIZ.nombre}. Todos los derechos reservados.
          </p>
          <p>Hecho en Costa Rica · React 19 + .NET 9 + SQL Server</p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;

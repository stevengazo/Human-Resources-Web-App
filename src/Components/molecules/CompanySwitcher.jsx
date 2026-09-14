import { useEffect, useRef, useState } from 'react';
import { Building2, Check, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

import { useAppContext } from '../../context/AppContext';
import { myCompaniesRequest } from '../../api/authApi';

/**
 * Cambiar de espacio de trabajo sin cerrar sesión — el mismo selector de
 * `/select-company`, pero como menú del dashboard (estilo Bitrix24/Slack).
 *
 * Al elegir otra empresa se recarga la página entera: casi todas las
 * páginas guardan en su propio estado datos de la empresa activa (planilla,
 * empleados, KPIs...) sin escuchar cambios de `company` en `AppContext`, y
 * un simple `navigate` los dejaría mostrando datos de la empresa anterior.
 */
const CompanySwitcher = ({ dark = false }) => {
  const { company, selectCompany } = useAppContext();
  const [abierto, setAbierto] = useState(false);
  const [empresas, setEmpresas] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [cambiando, setCambiando] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!abierto) return;

    const alClicar = (e) => {
      if (!ref.current?.contains(e.target)) setAbierto(false);
    };
    document.addEventListener('mousedown', alClicar);
    return () => document.removeEventListener('mousedown', alClicar);
  }, [abierto]);

  const abrir = async () => {
    setAbierto((v) => !v);
    if (empresas || cargando) return;

    setCargando(true);
    try {
      const { data } = await myCompaniesRequest();
      setEmpresas(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      toast.error('No se pudieron cargar tus empresas.');
    } finally {
      setCargando(false);
    }
  };

  const cambiar = async (companyId) => {
    if (companyId === company?.companyId) {
      setAbierto(false);
      return;
    }

    setCambiando(true);
    try {
      await selectCompany(companyId);
      window.location.href = '/my-profile';
    } catch (error) {
      console.error(error);
      toast.error('No se pudo cambiar de empresa.');
      setCambiando(false);
    }
  };

  if (!company) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={abrir}
        aria-expanded={abierto}
        aria-haspopup="menu"
        className={`flex max-w-44 items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium
          transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand
          ${
            dark
              ? 'text-gray-200 hover:bg-white/10'
              : 'text-ink-secondary hover:bg-canvas hover:text-ink'
          }`}
      >
        <Building2 size={16} className="shrink-0" />
        <span className="truncate">{company.name}</span>
        <ChevronDown
          size={14}
          className={`shrink-0 transition-transform ${abierto ? 'rotate-180' : ''}`}
        />
      </button>

      {abierto && (
        <div
          role="menu"
          className="absolute left-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl
                     border border-stroke-soft bg-surface shadow-xl"
        >
          <p className="border-b border-stroke-soft px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Cambiar de empresa
          </p>

          {cargando && (
            <p className="px-4 py-3 text-sm text-ink-muted">Cargando…</p>
          )}

          {!cargando && (empresas ?? []).length === 0 && (
            <p className="px-4 py-3 text-sm text-ink-muted">
              No se pudo cargar la lista.
            </p>
          )}

          {!cargando &&
            (empresas ?? []).map((c) => (
              <button
                key={c.companyId}
                type="button"
                role="menuitem"
                disabled={cambiando}
                onClick={() => cambiar(c.companyId)}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm
                           text-ink-secondary transition-colors hover:bg-canvas hover:text-ink
                           disabled:opacity-60"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center">
                  {c.companyId === company.companyId && (
                    <Check size={15} className="text-brand" />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium text-ink">
                    {c.name}
                  </span>
                  <span className="block truncate text-xs text-ink-muted">
                    {c.role}
                  </span>
                </span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default CompanySwitcher;

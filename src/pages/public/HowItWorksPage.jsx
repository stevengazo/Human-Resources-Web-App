import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Lock, RefreshCw, Server } from 'lucide-react';

import SectionHeading from '../../Components/molecules/marketing/SectionHeading';
import StepCard from '../../Components/molecules/marketing/StepCard';
import CtaButton from '../../Components/molecules/marketing/CtaButton';
import Reveal from '../../Components/molecules/marketing/Reveal';
import CtaBanner from '../../Components/organisms/marketing/CtaBanner';
import Seo from '../../Components/Seo';

import { ARQUITECTURA, PASOS } from '../../data/marketing';

/** Cómo viaja un dato desde que se registra hasta el comprobante de pago. */
const FLUJO = [
  {
    titulo: 'Se registra el movimiento',
    descripcion:
      'Una hora extra, una ausencia, un préstamo o una comisión se anota el día que ocurre.',
  },
  {
    titulo: 'Queda ligado al colaborador',
    descripcion:
      'El movimiento se guarda en el expediente con su fecha, monto y quién lo registró.',
  },
  {
    titulo: 'Entra al cálculo del periodo',
    descripcion:
      'Al generar la planilla, el sistema toma todo lo del periodo y aplica ingresos y deducciones.',
  },
  {
    titulo: 'Alguien lo aprueba',
    descripcion:
      'Nada se paga sin revisión. La planilla se congela al aprobarse y los movimientos del periodo quedan marcados como liquidados, para que ninguno se cobre dos veces.',
  },
  {
    titulo: 'Se emite el comprobante',
    descripcion:
      'Cada persona recibe su comprobante en PDF y lo consulta cuando quiera desde su portal.',
  },
  {
    titulo: 'Queda el rastro y se avisa',
    descripcion:
      'El cambio se registra en auditoría con quién lo hizo y qué cambió, y si tienes un webhook escuchando, tus otros sistemas se enteran en el momento.',
  },
];

/** Compromisos operativos del servicio. */
const GARANTIAS = [
  {
    icon: Lock,
    titulo: 'Tus datos son tuyos',
    descripcion:
      'Puedes exportarlos en cualquier momento y, si lo prefieres, alojarlos en tu propia infraestructura.',
  },
  {
    icon: RefreshCw,
    titulo: 'Actualizaciones incluidas',
    descripcion:
      'Las mejoras del sistema llegan sin costo adicional y sin interrumpir tu operación.',
  },
  {
    icon: Server,
    titulo: 'Respaldos automáticos',
    descripcion:
      'La base de datos se respalda de forma periódica, con retención acordada por contrato.',
  },
];

const HowItWorksPage = () => {
  return (
    <>
      <Seo
        title="Cómo funciona"
        description="De la hora extra al comprobante de pago: cómo viaja un dato dentro de Planitica, su arquitectura y cómo se implementa en tu empresa. Un producto de Savegre Soft."
        path="/como-funciona"
      />
      {/* Encabezado */}
      <section className="relative overflow-hidden border-b border-stroke-soft bg-surface">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/4 h-80 w-80 rounded-full bg-brand/15 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeading
              eyebrow="Cómo funciona"
              title="De la hoja de cálculo al sistema, en una semana"
              subtitle="La implementación la hacemos con tu equipo, no sobre tu equipo. Este es el camino completo."
            />
          </motion.div>
        </div>
      </section>

      {/* Pasos */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-24">
              <SectionHeading
                centered={false}
                eyebrow="Implementación"
                title="Cuatro etapas, sin sorpresas"
                subtitle="Cada etapa termina con algo revisable: la configuración aprobada, los datos cargados, la primera planilla de prueba."
              />
            </div>
          </Reveal>

          <div>
            {PASOS.map((paso, i) => (
              <Reveal key={paso.titulo} delay={i * 0.06}>
                <StepCard
                  numero={i + 1}
                  icon={paso.icon}
                  titulo={paso.titulo}
                  descripcion={paso.descripcion}
                  duracion={paso.duracion}
                  ultimo={i === PASOS.length - 1}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Flujo del dato */}
      <section className="border-y border-stroke-soft bg-surface-alt">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="El día a día"
              title="Qué pasa con un dato desde que lo registras"
              subtitle="Este es el motivo por el que el cierre de planilla deja de ser una carrera contra el reloj."
            />
          </Reveal>

          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FLUJO.map((paso, i) => (
              <Reveal key={paso.titulo} delay={i * 0.08}>
                <li className="relative h-full rounded-xl border border-stroke-soft bg-surface p-6 shadow-sm">
                  <span
                    className="grid h-8 w-8 place-items-center rounded-lg
                               bg-linear-to-br from-brand to-accent text-sm font-bold text-white"
                  >
                    {i + 1}
                  </span>

                  <h3 className="mt-4 text-sm font-semibold text-ink">
                    {paso.titulo}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {paso.descripcion}
                  </p>

                  {/* Flecha conectora (solo escritorio) */}
                  {i < FLUJO.length - 1 && (
                    <ChevronRight
                      aria-hidden="true"
                      size={20}
                      className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-stroke lg:block"
                    />
                  )}
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Arquitectura */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Tecnología"
            title="Construido sobre estándares, no sobre atajos"
            subtitle="Si tu equipo de TI quiere revisarlo, esta es la arquitectura completa."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ARQUITECTURA.map((bloque, i) => {
            const Icon = bloque.icon;

            return (
              <Reveal key={bloque.titulo} delay={i * 0.06}>
                <div className="h-full rounded-xl border border-stroke-soft bg-surface p-6 shadow-sm">
                  <div
                    className="mb-4 grid h-11 w-11 place-items-center rounded-lg
                               bg-brand-tint text-brand"
                  >
                    <Icon size={22} strokeWidth={1.8} />
                  </div>

                  <h3 className="text-base font-semibold text-ink">
                    {bloque.titulo}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {bloque.descripcion}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Diagrama simple de la arquitectura */}
        <Reveal delay={0.1}>
          <div className="mt-10 overflow-x-auto">
            <div className="flex min-w-max items-center justify-center gap-3 rounded-xl border border-stroke-soft bg-surface-alt p-6">
              {['Navegador', 'Aplicación web', 'API .NET', 'SQL Server'].map(
                (nodo, i, arr) => (
                  <div key={nodo} className="flex items-center gap-3">
                    <span
                      className="rounded-lg border border-stroke bg-surface px-4 py-2
                                 text-sm font-semibold text-ink shadow-sm"
                    >
                      {nodo}
                    </span>

                    {i < arr.length - 1 && (
                      <ArrowRight
                        size={18}
                        aria-hidden="true"
                        className="text-accent"
                      />
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Garantías */}
      <section className="border-y border-stroke-soft bg-surface-alt">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Compromisos"
              title="Lo que incluye el servicio"
            />
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {GARANTIAS.map((item, i) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.titulo} delay={i * 0.08}>
                  <div className="h-full rounded-xl border border-stroke-soft bg-surface p-6 shadow-sm">
                    <Icon size={24} className="text-brand" strokeWidth={1.8} />

                    <h3 className="mt-4 text-base font-semibold text-ink">
                      {item.titulo}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {item.descripcion}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner
        titulo="Te acompañamos en la puesta en marcha"
        subtitulo="Agenda una llamada y armamos juntos el plan de implementación para tu empresa."
        ctaSecundario={{ to: '/caracteristicas', label: 'Ver características' }}
      />
    </>
  );
};

export default HowItWorksPage;

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Sparkles, X } from 'lucide-react';

import SectionHeading from '../../Components/molecules/marketing/SectionHeading';
import FeatureCard from '../../Components/molecules/marketing/FeatureCard';
import StepCard from '../../Components/molecules/marketing/StepCard';
import FaqItem from '../../Components/molecules/marketing/FaqItem';
import CtaButton from '../../Components/molecules/marketing/CtaButton';
import Reveal from '../../Components/molecules/marketing/Reveal';
import AppPreview from '../../Components/organisms/marketing/AppPreview';
import CtaBanner from '../../Components/organisms/marketing/CtaBanner';
import Seo from '../../Components/Seo';

import {
  CIFRAS,
  DOLORES,
  FAQS,
  MODULOS,
  PASOS,
  PLANES,
  PRODUCTO,
} from '../../data/marketing';

/* Nueve, no seis: la cuadrícula es de tres columnas y así cierra en 3×3.
   Con seis se quedaban fuera las capacidades nuevas —IA, MCP y webhooks—,
   que son justo las que distinguen al producto. */
const destacados = MODULOS.filter((m) => m.destacado).slice(0, 9);
const planMasBarato = Math.min(
  ...PLANES.filter((p) => typeof p.precioMensual === 'number').map(
    (p) => p.precioMensual
  )
);

const LandingPage = () => {
  return (
    <>
      <Seo
        title="La planilla tica, sin hojas de cálculo"
        description="Planitica es el sistema de Recursos Humanos hecho para Costa Rica: expediente digital, planilla, ausencias, préstamos y desempeño en un solo lugar. Un producto de Savegre Soft."
        path="/"
      />

      {/* ============================= HERO ============================= */}
      <section className="relative overflow-hidden">
        {/* Halos decorativos de marca */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 -translate-x-1/2
                     rounded-full bg-brand/20 blur-3xl"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-0 h-80 w-80
                     rounded-full bg-accent/20 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 lg:px-8 lg:pb-24 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Copy */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span
                className="inline-flex items-center gap-2 rounded-full border border-stroke-soft
                           bg-surface px-3 py-1 text-xs font-semibold text-ink-secondary shadow-sm"
              >
                <Sparkles size={14} className="text-accent" />
                Sistema de RR.HH. para empresas de Costa Rica
              </span>

              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-ink text-balance sm:text-5xl lg:text-6xl">
                {PRODUCTO.claimInicio}{' '}
                <span className="bg-linear-to-r from-brand to-accent bg-clip-text text-transparent">
                  {PRODUCTO.claimResaltado}
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted text-pretty">
                Expediente digital, planilla, ausencias, préstamos y desempeño
                en un solo lugar. Lo que registras durante el mes es lo que el
                sistema usa para cerrar el periodo.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CtaButton to="/contacto" size="lg">
                  Solicitar demo
                  <ArrowRight size={18} />
                </CtaButton>

                <CtaButton to="/caracteristicas" variant="secondary" size="lg">
                  Ver características
                </CtaButton>
              </div>

              <p className="mt-5 text-sm text-ink-muted">
                Sin contrato de permanencia · Implementación acompañada ·
                Disponible en la nube o en tus servidores
              </p>
            </motion.div>

            {/* Maqueta del producto */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            >
              <AppPreview />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================ CIFRAS ============================ */}
      <section className="border-y border-stroke-soft bg-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
          {CIFRAS.map((cifra, i) => (
            <Reveal key={cifra.label} delay={i * 0.06}>
              <div className="text-center">
                <p className="bg-linear-to-r from-brand to-accent bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                  {cifra.valor}
                </p>
                <p className="mt-1.5 text-sm leading-snug text-ink-muted">
                  {cifra.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ======================= ANTES / DESPUÉS ======================== */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="El problema"
            title="La planilla no debería depender de un solo archivo"
            subtitle="Así se ve la operación de RR.HH. antes y después de centralizar la información."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Antes */}
          <Reveal>
            <div className="h-full rounded-xl border border-stroke-soft bg-surface-alt p-6 sm:p-8">
              <h3 className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-ink-muted">
                <X size={16} /> Hoy
              </h3>

              <ul className="space-y-4">
                {DOLORES.map((d) => (
                  <li key={d.antes} className="flex items-start gap-3">
                    <span className="mt-1.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-red-50 text-red-600">
                      <X size={11} strokeWidth={3} />
                    </span>
                    <span className="text-sm leading-relaxed text-ink-secondary">
                      {d.antes}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Después */}
          <Reveal delay={0.1}>
            <div className="relative h-full overflow-hidden rounded-xl border border-brand-200 bg-surface p-6 shadow-md sm:p-8">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-brand to-accent"
              />

              <h3 className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand">
                <Check size={16} /> Con {PRODUCTO.nombre}
              </h3>

              <ul className="space-y-4">
                {DOLORES.map((d) => (
                  <li key={d.despues} className="flex items-start gap-3">
                    <span className="mt-1.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-tint text-brand">
                      <Check size={11} strokeWidth={3} />
                    </span>
                    <span className="text-sm leading-relaxed text-ink-secondary">
                      {d.despues}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================== MÓDULOS ============================ */}
      <section className="border-y border-stroke-soft bg-surface-alt">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Características"
              title="Todo el ciclo del colaborador, conectado"
              subtitle="Cada módulo alimenta al siguiente: una ausencia registrada hoy se refleja sola en la planilla del cierre."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destacados.map((modulo, i) => (
              <Reveal key={modulo.titulo} delay={(i % 3) * 0.08}>
                <FeatureCard
                  icon={modulo.icon}
                  titulo={modulo.titulo}
                  descripcion={modulo.descripcion}
                />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-10 text-center">
              <CtaButton to="/caracteristicas" variant="secondary" size="md">
                Ver los {MODULOS.length} módulos
                <ArrowRight size={16} />
              </CtaButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================= CÓMO FUNCIONA ======================== */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-24">
              <SectionHeading
                centered={false}
                eyebrow="Cómo funciona"
                title="En marcha en una semana"
                subtitle="No te dejamos solo con un usuario y una contraseña: configuramos, migramos tus datos y capacitamos a tu equipo."
              />

              <div className="mt-8">
                <CtaButton to="/como-funciona" variant="secondary" size="md">
                  Ver el proceso completo
                  <ArrowRight size={16} />
                </CtaButton>
              </div>
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

      {/* ======================== PRECIOS (TEASER) ====================== */}
      <section className="border-y border-stroke-soft bg-surface-alt">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Precios"
              title={`Planes desde ₡${planMasBarato.toLocaleString('es-CR')} por colaborador`}
              subtitle="Pagas por las personas que tienes activas en el sistema. Sin costo de instalación en los planes en la nube."
            />
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {PLANES.map((plan, i) => (
              <Reveal key={plan.id} delay={i * 0.08}>
                <Link
                  to="/precios"
                  className={`group flex h-full flex-col rounded-xl border bg-surface p-6 transition-all
                    hover:-translate-y-0.5 hover:shadow-lg
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand
                    ${plan.destacado ? 'border-brand shadow-md' : 'border-stroke-soft shadow-sm'}`}
                >
                  <h3 className="text-base font-bold text-ink">{plan.nombre}</h3>

                  <p className="mt-2 text-2xl font-bold text-ink">
                    {typeof plan.precioMensual === 'number'
                      ? `₡${plan.precioMensual.toLocaleString('es-CR')}`
                      : plan.precioTexto}
                  </p>

                  <p className="mt-0.5 text-xs text-ink-muted">{plan.unidad}</p>

                  <p className="mt-4 grow text-sm leading-relaxed text-ink-muted">
                    {plan.resumen}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                    Ver detalle
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================= FAQ ============================== */}
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Dudas frecuentes"
            title="Lo que suelen preguntarnos"
          />
        </Reveal>

        <Reveal>
          <div className="mt-10 border-t border-stroke-soft">
            {FAQS.slice(0, 4).map((faq, i) => (
              <FaqItem
                key={faq.pregunta}
                id={`home-${i}`}
                pregunta={faq.pregunta}
                respuesta={faq.respuesta}
              />
            ))}
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-8 text-center text-sm text-ink-muted">
            ¿Te queda alguna duda?{' '}
            <Link
              to="/contacto"
              className="font-semibold text-brand hover:underline"
            >
              Escríbenos
            </Link>{' '}
            y te respondemos el mismo día.
          </p>
        </Reveal>
      </section>

      <CtaBanner />
    </>
  );
};

export default LandingPage;

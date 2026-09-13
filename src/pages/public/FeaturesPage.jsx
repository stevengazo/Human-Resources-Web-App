import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import SectionHeading from '../../Components/molecules/marketing/SectionHeading';
import FeatureCard from '../../Components/molecules/marketing/FeatureCard';
import CtaButton from '../../Components/molecules/marketing/CtaButton';
import Reveal from '../../Components/molecules/marketing/Reveal';
import CtaBanner from '../../Components/organisms/marketing/CtaBanner';
import Seo from '../../Components/Seo';

import { GRUPOS_MODULOS, MODULOS } from '../../data/marketing';

/** Módulos de un área. */
const porGrupo = (id) => MODULOS.filter((m) => m.grupo === id);

const FeaturesPage = () => {
  return (
    <>
      <Seo
        title="Características y módulos"
        description="Expediente digital, planilla, ausencias, préstamos, comisiones, KPIs y evaluaciones psicométricas: los módulos de Planitica, el sistema de RR. HH. de Savegre Soft para Costa Rica."
        path="/caracteristicas"
      />

      {/* Encabezado */}
      <section className="relative overflow-hidden border-b border-stroke-soft bg-surface">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-1/4 h-80 w-80 rounded-full bg-accent/15 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeading
              eyebrow="Características"
              title={`${MODULOS.length} módulos que trabajan como uno solo`}
              subtitle="No son sistemas separados pegados con reportes: el expediente, la planilla y el desempeño comparten la misma información."
            />
          </motion.div>

          {/* Índice de áreas */}
          <nav
            aria-label="Áreas del sistema"
            className="mt-10 flex flex-wrap justify-center gap-2"
          >
            {GRUPOS_MODULOS.map((grupo) => (
              <a
                key={grupo.id}
                href={`#${grupo.id}`}
                className="rounded-full border border-stroke-soft bg-canvas px-4 py-1.5
                           text-sm font-semibold text-ink-secondary transition-colors
                           hover:border-brand hover:bg-brand-tint hover:text-brand
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                {grupo.titulo}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Áreas y módulos */}
      {GRUPOS_MODULOS.map((grupo, indice) => {
        const modulos = porGrupo(grupo.id);
        if (modulos.length === 0) return null;

        return (
          <section
            key={grupo.id}
            id={grupo.id}
            className={`scroll-mt-20 border-b border-stroke-soft
              ${indice % 2 === 1 ? 'bg-surface-alt' : 'bg-canvas'}`}
          >
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
              <Reveal>
                <div className="max-w-2xl">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand">
                    Área {indice + 1} de {GRUPOS_MODULOS.length}
                  </span>

                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                    {grupo.titulo}
                  </h2>

                  <p className="mt-3 text-base leading-relaxed text-ink-muted">
                    {grupo.descripcion}
                  </p>
                </div>
              </Reveal>

              <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {modulos.map((modulo, i) => (
                  <Reveal key={modulo.titulo} delay={(i % 3) * 0.08}>
                    <FeatureCard
                      icon={modulo.icon}
                      titulo={modulo.titulo}
                      descripcion={modulo.descripcion}
                      detalles={modulo.detalles}
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Nota técnica */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-xl font-semibold text-ink">
            ¿Necesitas algo que no está en la lista?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">
            El sistema se construyó sobre una API propia, así que podemos
            agregar módulos, campos e integraciones con las herramientas que ya
            usas.
          </p>

          <div className="mt-6 flex justify-center">
            <CtaButton to="/como-funciona" variant="secondary" size="md">
              Ver cómo está construido
              <ArrowRight size={16} />
            </CtaButton>
          </div>
        </Reveal>
      </section>

      <CtaBanner
        titulo="Veámoslo con tus datos"
        subtitulo="En la demo cargamos un par de colaboradores reales y generamos una planilla de prueba contigo."
      />
    </>
  );
};

export default FeaturesPage;

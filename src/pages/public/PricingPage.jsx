import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Minus } from 'lucide-react';

import SectionHeading from '../../Components/molecules/marketing/SectionHeading';
import PricingCard from '../../Components/molecules/marketing/PricingCard';
import FaqItem from '../../Components/molecules/marketing/FaqItem';
import Reveal from '../../Components/molecules/marketing/Reveal';
import CtaBanner from '../../Components/organisms/marketing/CtaBanner';
import Seo from '../../Components/Seo';

import { COMPARATIVO, FAQS, PLANES } from '../../data/marketing';

/** Celda del comparativo: check, guion o texto libre. */
const CeldaValor = ({ valor }) => {
  if (valor === true) {
    return (
      <>
        <Check
          size={18}
          strokeWidth={2.5}
          className="mx-auto text-brand"
          aria-hidden="true"
        />
        <span className="sr-only">Incluido</span>
      </>
    );
  }

  if (valor === false) {
    return (
      <>
        <Minus
          size={18}
          className="mx-auto text-ink-disabled"
          aria-hidden="true"
        />
        <span className="sr-only">No incluido</span>
      </>
    );
  }

  return (
    <span className="text-xs font-semibold text-ink-secondary">{valor}</span>
  );
};

const PricingPage = () => {
  const [anual, setAnual] = useState(false);

  return (
    <>
      <Seo
        title="Precios y planes"
        description="Planes de Planitica para empresas costarricenses, según cuántos colaboradores tienes y qué módulos necesitas. Un producto de Savegre Soft."
        path="/precios"
      />

      {/* Encabezado */}
      <section className="relative overflow-hidden border-b border-stroke-soft bg-surface">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-brand/15 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeading
              eyebrow="Precios"
              title="Pagas por colaborador activo"
              subtitle="Sin costo de instalación ni licencias por módulo. Puedes cambiar de plan cuando lo necesites."
            />
          </motion.div>

          {/* Interruptor mensual / anual */}
          <div className="mt-10 flex flex-col items-center gap-3">
            <div
              role="group"
              aria-label="Periodicidad de pago"
              className="inline-flex rounded-lg border border-stroke-soft bg-canvas p-1"
            >
              <button
                type="button"
                onClick={() => setAnual(false)}
                aria-pressed={!anual}
                className={`rounded-md px-4 py-1.5 text-sm font-semibold transition-colors
                  ${
                    !anual
                      ? 'bg-surface text-ink shadow-sm'
                      : 'text-ink-muted hover:text-ink'
                  }`}
              >
                Mensual
              </button>

              <button
                type="button"
                onClick={() => setAnual(true)}
                aria-pressed={anual}
                className={`rounded-md px-4 py-1.5 text-sm font-semibold transition-colors
                  ${
                    anual
                      ? 'bg-surface text-ink shadow-sm'
                      : 'text-ink-muted hover:text-ink'
                  }`}
              >
                Anual
              </button>
            </div>

            <p className="text-xs font-semibold text-accent-strong">
              Con pago anual obtienes dos meses de descuento
            </p>
          </div>
        </div>
      </section>

      {/* Planes */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid items-stretch gap-6 lg:grid-cols-3 lg:gap-8">
          {PLANES.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.08} className="h-full">
              <PricingCard plan={plan} anual={anual} />
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-ink-muted">
          Precios en colones costarricenses, sin IVA. El monto mínimo de
          facturación corresponde a 10 colaboradores.
        </p>
      </section>

      {/* Comparativo */}
      <section className="border-y border-stroke-soft bg-surface-alt">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Comparativo"
              title="Qué incluye cada plan"
            />
          </Reveal>

          <Reveal>
            <div className="mt-12 overflow-x-auto rounded-xl border border-stroke-soft bg-surface shadow-sm">
              <table className="w-full min-w-2xl border-collapse text-sm">
                <caption className="sr-only">
                  Comparación de funcionalidades entre los planes Esencial,
                  Profesional y Corporativo
                </caption>

                <thead className="bg-surface-alt text-ink-secondary">
                  <tr>
                    <th scope="col" className="px-5 py-3 text-left font-semibold">
                      Funcionalidad
                    </th>
                    {PLANES.map((plan) => (
                      <th
                        key={plan.id}
                        scope="col"
                        className={`px-5 py-3 text-center font-semibold
                          ${plan.destacado ? 'text-brand' : ''}`}
                      >
                        {plan.nombre}
                      </th>
                    ))}
                  </tr>
                </thead>

                {COMPARATIVO.map((seccion) => (
                  <tbody
                    key={seccion.grupo}
                    className="divide-y divide-stroke-soft border-t border-stroke-soft"
                  >
                    <tr>
                      <th
                        scope="colgroup"
                        colSpan={PLANES.length + 1}
                        className="bg-canvas px-5 py-2 text-left text-xs font-bold uppercase tracking-widest text-ink-muted"
                      >
                        {seccion.grupo}
                      </th>
                    </tr>

                    {seccion.filas.map((fila) => (
                      <tr
                        key={fila.label}
                        className="transition-colors hover:bg-canvas"
                      >
                        <th
                          scope="row"
                          className="px-5 py-3 text-left font-medium text-ink"
                        >
                          {fila.label}
                        </th>
                        <td className="px-5 py-3 text-center">
                          <CeldaValor valor={fila.esencial} />
                        </td>
                        <td className="px-5 py-3 text-center">
                          <CeldaValor valor={fila.profesional} />
                        </td>
                        <td className="px-5 py-3 text-center">
                          <CeldaValor valor={fila.corporativo} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Preguntas frecuentes"
            title="Antes de decidir"
          />
        </Reveal>

        <Reveal>
          <div className="mt-10 border-t border-stroke-soft">
            {FAQS.map((faq, i) => (
              <FaqItem
                key={faq.pregunta}
                id={`precios-${i}`}
                pregunta={faq.pregunta}
                respuesta={faq.respuesta}
              />
            ))}
          </div>
        </Reveal>
      </section>

      <CtaBanner
        titulo="¿No estás seguro de cuál plan te conviene?"
        subtitulo="Cuéntanos cuántos colaboradores tienes y cómo pagas hoy la planilla. Te decimos con cuál empezar."
        ctaSecundario={{ to: '/como-funciona', label: 'Cómo funciona' }}
      />
    </>
  );
};

export default PricingPage;

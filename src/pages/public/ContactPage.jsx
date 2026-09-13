import { motion } from 'framer-motion';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';

import SectionHeading from '../../Components/molecules/marketing/SectionHeading';
import Reveal from '../../Components/molecules/marketing/Reveal';
import ContactForm from '../../Components/organisms/marketing/ContactForm';
import Seo from '../../Components/Seo';

import { CONTACTO } from '../../data/marketing';

const canales = [
  { icon: Mail, label: 'Correo', valor: CONTACTO.email, href: `mailto:${CONTACTO.email}` },
  { icon: Phone, label: 'Teléfono', valor: CONTACTO.telefono, href: `tel:${CONTACTO.telefono.replace(/\s/g, '')}` },
  { icon: MapPin, label: 'Ubicación', valor: CONTACTO.ubicacion },
  { icon: Clock, label: 'Horario', valor: CONTACTO.horario },
];

const expectativas = [
  'Una llamada de 30 minutos para entender cómo llevas la planilla hoy.',
  'Una demostración con un caso parecido al de tu empresa.',
  'Una propuesta con el plan recomendado y el tiempo de implementación.',
];

const ContactPage = () => {
  return (
    <>
      <Seo
        title="Contacto"
        description="Solicita una demostración de Planitica: 30 minutos para entender cómo llevas la planilla hoy y una propuesta con el plan recomendado. Un producto de Savegre Soft."
        path="/contacto"
      />

      {/* Encabezado */}
      <section className="relative overflow-hidden border-b border-stroke-soft bg-surface">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-1/3 h-80 w-80 rounded-full bg-accent/15 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeading
              eyebrow="Contacto"
              title="Conversemos sobre tu planilla"
              subtitle="Déjanos tus datos y coordinamos una demostración sin compromiso."
            />
          </motion.div>
        </div>
      </section>

      {/* Formulario + información */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-14">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-8">
              {/* Canales directos */}
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-brand">
                  Contacto directo
                </h2>

                <ul className="mt-5 space-y-4">
                  {canales.map(({ icon: Icon, label, valor, href }) => (
                    <li key={label} className="flex items-start gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-tint text-brand">
                        <Icon size={17} />
                      </span>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                          {label}
                        </p>

                        {href ? (
                          <a
                            href={href}
                            className="text-sm font-medium text-ink transition-colors hover:text-brand"
                          >
                            {valor}
                          </a>
                        ) : (
                          <p className="text-sm font-medium text-ink">{valor}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Qué sigue */}
              <div className="rounded-xl border border-stroke-soft bg-surface-alt p-6">
                <h2 className="text-base font-semibold text-ink">
                  Qué pasa después
                </h2>

                <ol className="mt-4 space-y-3">
                  {expectativas.map((texto, i) => (
                    <li key={texto} className="flex items-start gap-3">
                      <span
                        className="grid h-5 w-5 shrink-0 place-items-center rounded-full
                                   bg-linear-to-br from-brand to-accent text-[11px] font-bold text-white"
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm leading-relaxed text-ink-secondary">
                        {texto}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Nota para clientes actuales */}
              <div className="rounded-xl border border-stroke-soft bg-surface p-6 shadow-sm">
                <h2 className="text-base font-semibold text-ink">
                  ¿Ya eres cliente?
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  Si necesitas soporte sobre el sistema que ya usas, escríbenos
                  a{' '}
                  <a
                    href={`mailto:${CONTACTO.email}`}
                    className="font-semibold text-brand hover:underline"
                  >
                    {CONTACTO.email}
                  </a>{' '}
                  con el nombre de tu empresa.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default ContactPage;

import { useState } from 'react';
import { Mail, Palette, Plug, Send, Shield, Sparkles, Webhook } from 'lucide-react';

import PageTitle from '../Components/PageTitle';
import Divider from '../Components/Divider';
import ThemeSettings from '../Components/organisms/ThemeSettings';
import AiSettings from '../Components/organisms/AiSettings';
import EmailSettings from '../Components/organisms/EmailSettings';
import WebhookSettings from '../Components/organisms/WebhookSettings';
import McpSettings from '../Components/organisms/McpSettings';
import RolesSettings from '../Components/organisms/RolesSettings';
import CompanyInvitations from '../Components/organisms/CompanyInvitations';
import { useAppContext } from '../context/AppContext';

const TABS = {
  APARIENCIA: 'apariencia',
  IA: 'ia',
  CORREO: 'correo',
  WEBHOOKS: 'webhooks',
  MCP: 'mcp',
  ROLES: 'roles',
  INVITACIONES: 'invitaciones',
};

const SECCIONES = [
  { id: TABS.APARIENCIA, label: 'Apariencia', icon: Palette, Panel: ThemeSettings },
  { id: TABS.IA, label: 'Inteligencia artificial', icon: Sparkles, Panel: AiSettings },
  { id: TABS.CORREO, label: 'Correo de salida', icon: Mail, Panel: EmailSettings },
  { id: TABS.WEBHOOKS, label: 'Webhooks', icon: Webhook, Panel: WebhookSettings },
  { id: TABS.MCP, label: 'MCP', icon: Plug, Panel: McpSettings },
  { id: TABS.ROLES, label: 'Roles y permisos', icon: Shield, Panel: RolesSettings },
  { id: TABS.INVITACIONES, label: 'Invitaciones', icon: Send, Panel: CompanyInvitations, soloAdmin: true },
];

/**
 * Configuración del sistema.
 *
 * La navegación es una lista vertical a la izquierda; el contenido a la derecha.
 */
const SettingsPage = () => {
  const { hasRole } = useAppContext();
  const [tab, setTab] = useState(TABS.APARIENCIA);

  const secciones = SECCIONES.filter((s) => !s.soloAdmin || hasRole('Admin'));
  const actual = secciones.find((s) => s.id === tab) ?? secciones[0];
  const Panel = actual.Panel;

  return (
    <>
      <div>
        <PageTitle className="mb-0">Configuración</PageTitle>
        <p className="text-sm text-ink-muted">
          Apariencia, integraciones con el exterior y permisos.
        </p>
      </div>

      <Divider />

      <div className="grid gap-6 md:grid-cols-[220px_1fr]">
        {/* Lista vertical */}
        <nav className="flex flex-col gap-1 md:sticky md:top-20 md:self-start">
          {secciones.map(({ id, label, icon: Icon }) => {
            const activo = id === tab;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                aria-current={activo ? 'page' : undefined}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium
                            transition-colors
                            ${
                              activo
                                ? 'bg-brand-tint text-brand-700'
                                : 'text-ink-secondary hover:bg-canvas hover:text-ink'
                            }`}
              >
                <Icon size={16} className="shrink-0" />
                <span className="truncate">{label}</span>
              </button>
            );
          })}
        </nav>

        {/* Contenido */}
        <div className="min-w-0">
          <Panel />
        </div>
      </div>
    </>
  );
};

export default SettingsPage;

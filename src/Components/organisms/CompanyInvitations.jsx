import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Mail, RefreshCw, Send, X } from 'lucide-react';

import RolesApi from '../../api/roles';
import {
  createInvitationRequest,
  listInvitationsRequest,
  resendInvitationRequest,
  revokeInvitationRequest,
} from '../../api/invitationsApi';
import { useConfirm } from '../../hooks/useConfirm';
import { mensajeDeError } from '../../utils/apiError';
import SecondaryButton from '../SecondaryButton';
import PrimaryButton from '../PrimaryButton';
import { fieldClasses } from '../atoms/fieldClasses';

const ESTILO_ESTADO = {
  Pendiente: 'border-amber-200 bg-amber-50 text-amber-700',
  Aceptada: 'border-green-200 bg-green-50 text-green-700',
  Revocada: 'border-stroke-soft bg-surface-alt text-ink-muted',
  Vencida: 'border-stroke-soft bg-surface-alt text-ink-muted',
};

const formatFecha = (iso) =>
  iso ? new Date(iso).toLocaleDateString('es-CR', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

/**
 * Invitar un correo a la empresa activa — estilo Bitrix24: se manda un link
 * de un solo uso que vence en 7 días (`InvitationsController`).
 */
const CompanyInvitations = () => {
  const { confirm, dialog } = useConfirm();

  const [roles, setRoles] = useState([]);
  const [invitaciones, setInvitaciones] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [enviando, setEnviando] = useState(false);

  const [accionando, setAccionando] = useState(null); // id en curso (reenviar/revocar)

  const cargar = useCallback(async () => {
    setCargando(true);
    try {
      const [rolesRes, invitacionesRes] = await Promise.all([
        RolesApi.getAll(),
        listInvitationsRequest(),
      ]);
      setRoles(rolesRes?.data ?? []);
      setInvitaciones(invitacionesRes?.data ?? []);
    } catch (error) {
      console.error(error);
      toast.error(mensajeDeError(error, 'No se pudieron cargar las invitaciones.'));
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  /** Copia el link al portapapeles; si falla el correo es la única forma de compartir la invitación. */
  const avisarResultado = (inviteLink, emailEnviado, mensajeExito) => {
    if (emailEnviado) {
      toast.success(mensajeExito);
      return;
    }
    navigator.clipboard?.writeText(inviteLink).catch(() => {});
    toast.error(
      'No se pudo enviar el correo (revisa Configuración → Correo de salida). Se copió el link al portapapeles para compartirlo a mano.',
      { duration: 6000 }
    );
  };

  const handleInvitar = async (e) => {
    e.preventDefault();
    setEnviando(true);
    try {
      const { data } = await createInvitationRequest({ email, role });
      avisarResultado(data.inviteLink, data.emailEnviado, `Invitación enviada a ${email}`);
      setEmail('');
      setRole('');
      cargar();
    } catch (error) {
      toast.error(mensajeDeError(error, 'No se pudo enviar la invitación.'));
    } finally {
      setEnviando(false);
    }
  };

  const handleReenviar = async (id) => {
    setAccionando(id);
    try {
      const { data } = await resendInvitationRequest(id);
      avisarResultado(data.inviteLink, data.emailEnviado, 'Invitación reenviada');
      cargar();
    } catch (error) {
      toast.error(mensajeDeError(error, 'No se pudo reenviar la invitación.'));
    } finally {
      setAccionando(null);
    }
  };

  const handleRevocar = async (invitacion) => {
    const ok = await confirm({
      title: 'Revocar invitación',
      message: `¿Cancelar la invitación a ${invitacion.email}? El link dejará de funcionar.`,
      confirmLabel: 'Revocar',
      tone: 'destructive',
      onConfirm: async () => {
        try {
          await revokeInvitationRequest(invitacion.companyInvitationId);
          toast.success('Invitación revocada');
          cargar();
        } catch (error) {
          toast.error(mensajeDeError(error, 'No se pudo revocar la invitación.'));
        }
      },
    });
    if (ok === false) return;
  };

  return (
    <div className="space-y-5">
      {dialog}

      <div>
        <h3 className="text-sm font-semibold text-ink">Invitaciones</h3>
        <p className="mt-0.5 text-sm text-ink-muted">
          Invita un correo a unirse a esta empresa. Si ya tiene cuenta, se une con
          solo iniciar sesión; si no, crea una cuenta nueva directo aquí.
        </p>
      </div>

      <form
        onSubmit={handleInvitar}
        className="flex flex-wrap items-end gap-3 rounded-xl border border-stroke-soft bg-surface p-4"
      >
        <div className="min-w-48 flex-1">
          <label className="mb-1 block text-xs font-medium text-ink-secondary">Correo</label>
          <div className="relative">
            <Mail size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="persona@correo.com"
              className={fieldClasses({ className: 'h-9 pl-9' })}
            />
          </div>
        </div>

        <div className="w-40">
          <label className="mb-1 block text-xs font-medium text-ink-secondary">Rol</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={fieldClasses({ className: 'h-9' })}
          >
            <option value="">Employee</option>
            {roles
              .filter((r) => r.name !== 'Employee')
              .map((r) => (
                <option key={r.id} value={r.name}>
                  {r.name}
                </option>
              ))}
          </select>
        </div>

        <PrimaryButton type="submit" disabled={enviando}>
          <Send size={15} />
          {enviando ? 'Enviando…' : 'Invitar'}
        </PrimaryButton>
      </form>

      {cargando ? (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-12 animate-pulse rounded-lg bg-surface-alt" />
          ))}
        </div>
      ) : invitaciones.length === 0 ? (
        <p className="rounded-xl border border-dashed border-stroke bg-surface-alt py-10 text-center text-sm text-ink-muted">
          Todavía no invitaste a nadie.
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-stroke-soft">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-surface-alt text-ink-secondary">
                <th className="px-4 py-2 font-semibold">Correo</th>
                <th className="px-4 py-2 font-semibold">Rol</th>
                <th className="px-4 py-2 font-semibold">Invitado por</th>
                <th className="px-4 py-2 font-semibold">Vence</th>
                <th className="px-4 py-2 font-semibold">Estado</th>
                <th className="px-4 py-2 font-semibold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stroke-soft">
              {invitaciones.map((inv) => (
                <tr key={inv.companyInvitationId} className="hover:bg-canvas">
                  <td className="px-4 py-2 text-ink">{inv.email}</td>
                  <td className="px-4 py-2 text-ink-secondary">{inv.role || 'Employee'}</td>
                  <td className="px-4 py-2 text-ink-secondary">{inv.invitedBy ?? '—'}</td>
                  <td className="px-4 py-2 text-ink-secondary">{formatFecha(inv.expiresAt)}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${ESTILO_ESTADO[inv.status] ?? ESTILO_ESTADO.Revocada}`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right">
                    {inv.status === 'Pendiente' && (
                      <div className="flex justify-end gap-1">
                        <SecondaryButton
                          onClick={() => handleReenviar(inv.companyInvitationId)}
                          disabled={accionando !== null}
                          title="Reenviar"
                        >
                          <RefreshCw
                            size={14}
                            className={accionando === inv.companyInvitationId ? 'animate-spin' : undefined}
                          />
                        </SecondaryButton>
                        <SecondaryButton
                          onClick={() => handleRevocar(inv)}
                          disabled={accionando !== null}
                          title="Revocar"
                        >
                          <X size={14} />
                        </SecondaryButton>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompanyInvitations;

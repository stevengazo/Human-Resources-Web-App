import { useEffect, useState } from 'react';
import { KeyRound, Link2, Unlink } from 'lucide-react';
import toast from 'react-hot-toast';

import SectionTitle from '../SectionTitle';
import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';
import GoogleButton from '../molecules/GoogleButton';
import { useConfirm } from '../../hooks/useConfirm';
import { mensajeDeError } from '../../utils/apiError';
import {
  getExternalLoginsRequest,
  linkGoogleRequest,
  unlinkGoogleRequest,
  setPasswordRequest,
} from '../../api/authApi';

/**
 * Sección "Cuentas vinculadas" del perfil: permite vincular/desvincular
 * Google y, si hace falta, establecer una contraseña antes de desvincular
 * (para no dejar la cuenta sin forma de entrar).
 */
const LinkedAccounts = () => {
  const { confirm, dialog } = useConfirm();
  const [cargando, setCargando] = useState(true);
  const [hasPassword, setHasPassword] = useState(true);
  const [providers, setProviders] = useState([]);
  const [showSetPassword, setShowSetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);

  const cargar = async () => {
    setCargando(true);
    try {
      const { data } = await getExternalLoginsRequest();
      setHasPassword(Boolean(data?.hasPassword));
      setProviders(data?.providers ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const googleVinculado = providers.includes('Google');

  const handleLink = async (idToken) => {
    try {
      await linkGoogleRequest(idToken);
      toast.success('Cuenta de Google vinculada');
      cargar();
    } catch (error) {
      toast.error(mensajeDeError(error, 'No se pudo vincular la cuenta de Google'));
    }
  };

  const handleUnlink = async () => {
    const ok = await confirm({
      title: 'Desvincular Google',
      message: '¿Seguro que quieres desvincular tu cuenta de Google?',
      confirmLabel: 'Desvincular',
      tone: 'destructive',
      onConfirm: async () => {
        try {
          await unlinkGoogleRequest();
          toast.success('Cuenta de Google desvinculada');
          cargar();
        } catch (error) {
          toast.error(mensajeDeError(error, 'No se pudo desvincular la cuenta de Google'));
        }
      },
    });
    if (ok === false) return;
  };

  const handleSetPassword = async (e) => {
    e.preventDefault();
    setSavingPassword(true);
    try {
      await setPasswordRequest(newPassword);
      toast.success('Contraseña establecida correctamente');
      setNewPassword('');
      setShowSetPassword(false);
      cargar();
    } catch (error) {
      toast.error(mensajeDeError(error, 'No se pudo establecer la contraseña'));
    } finally {
      setSavingPassword(false);
    }
  };

  if (cargando) {
    return (
      <div className="h-16 animate-pulse rounded-lg bg-surface-alt" />
    );
  }

  return (
    <div className="space-y-4">
      {dialog}
      <SectionTitle>Cuentas vinculadas</SectionTitle>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-stroke-soft bg-surface p-4">
        <div className="flex items-center gap-3">
          <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z" />
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
            <path fill="#4CAF50" d="M24 44c5.5 0 10.5-2.1 14.3-5.5l-6.6-5.6C29.6 34.8 26.9 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z" />
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.6 5.6C40.9 36.5 44 30.7 44 24c0-1.3-.1-2.7-.4-3.5z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-ink">Google</p>
            <p className="text-xs text-ink-muted">
              {googleVinculado ? 'Vinculada' : 'No vinculada'}
            </p>
          </div>
        </div>

        {googleVinculado ? (
          <SecondaryButton onClick={handleUnlink}>
            <Unlink size={15} />
            Desvincular
          </SecondaryButton>
        ) : (
          <GoogleButton text="continue_with" onCredential={handleLink} />
        )}
      </div>

      {!hasPassword && (
        <div className="rounded-xl border border-stroke-soft bg-surface-alt p-4">
          <p className="text-sm text-ink-secondary">
            Tu cuenta no tiene contraseña — solo puedes entrar con Google. Si
            quieres poder desvincularla más adelante, establece una primero.
          </p>

          {showSetPassword ? (
            <form onSubmit={handleSetPassword} className="mt-3 flex flex-wrap items-end gap-2">
              <div>
                <label className="mb-1 block text-xs text-ink-muted">Nueva contraseña</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="rounded-lg border border-stroke bg-surface px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>
              <PrimaryButton type="submit" disabled={savingPassword}>
                <KeyRound size={15} />
                {savingPassword ? 'Guardando...' : 'Guardar'}
              </PrimaryButton>
              <SecondaryButton type="button" onClick={() => setShowSetPassword(false)}>
                Cancelar
              </SecondaryButton>
            </form>
          ) : (
            <SecondaryButton className="mt-3" onClick={() => setShowSetPassword(true)}>
              <Link2 size={15} />
              Establecer contraseña
            </SecondaryButton>
          )}
        </div>
      )}
    </div>
  );
};

export default LinkedAccounts;

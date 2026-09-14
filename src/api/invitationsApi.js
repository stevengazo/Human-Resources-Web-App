import apiClient from './apiClient';

/** Invita un correo a la empresa activa (Admin). `role` es opcional (string vacío = solo Employee). */
const createInvitationRequest = ({ email, role }) => {
  return apiClient.post('/Invitations', { email, role });
};

/** Invitaciones de la empresa activa (Admin): pendientes, aceptadas, revocadas, vencidas. */
const listInvitationsRequest = () => {
  return apiClient.get('/Invitations');
};

/** Genera un nuevo link (y reenvía el correo) para una invitación pendiente. */
const resendInvitationRequest = (id) => {
  return apiClient.post(`/Invitations/${id}/resend`);
};

/** Cancela una invitación pendiente. */
const revokeInvitationRequest = (id) => {
  return apiClient.delete(`/Invitations/${id}`);
};

/** Público: datos de una invitación por su token, para la pantalla de aceptación. */
const getInvitePreviewRequest = (token) => {
  return apiClient.get(`/Invitations/token/${token}`);
};

/** Acepta una invitación creando la cuenta (correo sin cuenta previa). */
const acceptInviteRequest = ({ token, firstName, password }) => {
  return apiClient.post('/Invitations/accept', { token, firstName, password });
};

/** Acepta una invitación con una sesión ya iniciada (el correo ya tenía cuenta). */
const acceptInviteLoggedInRequest = (token) => {
  return apiClient.post('/Invitations/accept-logged-in', { token });
};

export {
  createInvitationRequest,
  listInvitationsRequest,
  resendInvitationRequest,
  revokeInvitationRequest,
  getInvitePreviewRequest,
  acceptInviteRequest,
  acceptInviteLoggedInRequest,
};

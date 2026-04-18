export type RecoveryStep = "otp" | "reset";

interface RecoverySession {
  email: string;
  step: RecoveryStep;
}

const RECOVERY_SESSION_KEY = "doel-auth-recovery";
const RESET_SUCCESS_KEY = "doel-auth-reset-success";

function canUseSessionStorage() {
  return typeof window !== "undefined" && typeof window.sessionStorage !== "undefined";
}

export function getRecoverySession(): RecoverySession | null {
  if (!canUseSessionStorage()) return null;

  const raw = window.sessionStorage.getItem(RECOVERY_SESSION_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as RecoverySession;
    if (!parsed.email || !parsed.step) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function setRecoverySession(email: string, step: RecoveryStep) {
  if (!canUseSessionStorage()) return;

  const payload: RecoverySession = { email, step };
  window.sessionStorage.setItem(RECOVERY_SESSION_KEY, JSON.stringify(payload));
}

export function updateRecoveryStep(step: RecoveryStep) {
  const session = getRecoverySession();
  if (!session) return;
  setRecoverySession(session.email, step);
}

export function clearRecoverySession() {
  if (!canUseSessionStorage()) return;
  window.sessionStorage.removeItem(RECOVERY_SESSION_KEY);
}

export function markResetSuccess() {
  if (!canUseSessionStorage()) return;
  window.sessionStorage.setItem(RESET_SUCCESS_KEY, "true");
}

export function consumeResetSuccess() {
  if (!canUseSessionStorage()) return false;

  const success = window.sessionStorage.getItem(RESET_SUCCESS_KEY) === "true";
  window.sessionStorage.removeItem(RESET_SUCCESS_KEY);
  return success;
}

const RECOVERY_SESSION_KEY = "doel-auth-recovery";
const RESET_SUCCESS_KEY = "doel-auth-reset-success";

function canUseSessionStorage() {
  return typeof window !== "undefined" && typeof window.sessionStorage !== "undefined";
}

export function clearDashboardSession() {
  if (!canUseSessionStorage()) return;

  window.sessionStorage.removeItem(RECOVERY_SESSION_KEY);
  window.sessionStorage.removeItem(RESET_SUCCESS_KEY);
}

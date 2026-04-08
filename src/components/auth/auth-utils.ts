export const OTP_LENGTH = 6;
export const MIN_PASSWORD_LENGTH = 8;

export function validateEmail(value: string) {
  const normalized = value.trim();
  if (!normalized) return "Email Address is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return "Enter a valid email address";
  }
  return undefined;
}

export function validatePassword(value: string) {
  if (!value.trim()) return "Password is required";
  if (value.trim().length < MIN_PASSWORD_LENGTH) {
    return `Use at least ${MIN_PASSWORD_LENGTH} characters`;
  }
  return undefined;
}

export function maskEmail(email: string) {
  const [name = "", domain = ""] = email.split("@");
  if (!name || !domain) return email;

  const visible = name.slice(0, 2);
  const masked = `${visible}${"*".repeat(Math.max(name.length - 2, 2))}`;
  return `${masked}@${domain}`;
}

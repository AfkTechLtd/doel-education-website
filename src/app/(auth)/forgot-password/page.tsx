import type { Metadata } from "next";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import AuthPageShell from "@/components/auth/AuthPageShell";

export const metadata: Metadata = {
  title: "Forgot Password | Doel Education",
  description: "Request a password reset code for your Doel Education account.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthPageShell>
      <ForgotPasswordForm />
    </AuthPageShell>
  );
}

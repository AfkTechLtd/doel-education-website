import type { Metadata } from "next";
import AuthPageShell from "@/components/auth/AuthPageShell";
import VerifyEmailContent from "./VerifyEmailContent";

export const metadata: Metadata = {
  title: "Verify Your Email | Doel Education",
  description: "Check your inbox to confirm your email address.",
};

export default function VerifyEmailPage() {
  return (
    <AuthPageShell>
      <VerifyEmailContent />
    </AuthPageShell>
  );
}

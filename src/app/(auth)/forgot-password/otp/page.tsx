import type { Metadata } from "next";
import AuthPageShell from "@/components/auth/AuthPageShell";
import OtpVerificationForm from "@/components/auth/OtpVerificationForm";

export const metadata: Metadata = {
  title: "OTP Verification | Doel Education",
  description: "Verify your reset code to continue changing your password.",
};

export default function ForgotPasswordOtpPage() {
  return (
    <AuthPageShell>
      <OtpVerificationForm />
    </AuthPageShell>
  );
}

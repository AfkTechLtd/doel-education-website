import type { Metadata } from "next";
import AuthPageShell from "@/components/auth/AuthPageShell";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account | Doel Education",
  description: "Register for the Doel Education student portal.",
};

export default function RegisterPage() {
  return (
    <AuthPageShell>
      <RegisterForm />
    </AuthPageShell>
  );
}

import type { Metadata } from "next";
import AuthPageShell from "@/components/auth/AuthPageShell";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Register | Doel Education",
  description: "Create your student account to get started.",
};

export default function RegisterPage() {
  return (
    <AuthPageShell>
      <RegisterForm />
    </AuthPageShell>
  );
}

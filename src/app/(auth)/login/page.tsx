import type { Metadata } from "next";
import AuthPageShell from "@/components/auth/AuthPageShell";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login | Doel Education",
  description: "Login to continue with Doel Education.",
};

export default function LoginPage() {
  return (
    <AuthPageShell>
      <LoginForm />
    </AuthPageShell>
  );
}

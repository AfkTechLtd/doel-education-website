import type { Metadata } from "next";
import AuthPageShell from "@/components/auth/AuthPageShell";
import LoginForm, { LoginFormFooter } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Student Login | Doel Education",
  description: "Sign in to the Doel Education student portal.",
};

export default function LoginPage() {
  return (
    <AuthPageShell>
      <LoginForm />
      <div className="mt-6">
        <LoginFormFooter />
      </div>
    </AuthPageShell>
  );
}

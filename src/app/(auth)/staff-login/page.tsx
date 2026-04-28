import type { Metadata } from "next";
import AuthPageShell from "@/components/auth/AuthPageShell";
import StaffLoginForm, { StaffLoginFormFooter } from "@/components/auth/StaffLoginForm";

export const metadata: Metadata = {
  title: "Staff Login | Doel Education",
  description: "Sign in to the Doel Education staff portal.",
};

export default function StaffLoginPage() {
  return (
    <AuthPageShell>
      <StaffLoginForm />
      <div className="mt-6">
        <StaffLoginFormFooter />
      </div>
    </AuthPageShell>
  );
}

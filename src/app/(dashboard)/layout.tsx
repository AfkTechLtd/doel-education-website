import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import DashboardShell from "@/components/dashboard/shell/DashboardShell";
import { getUser } from "@/lib/auth";
import { ROUTES } from "@/lib/constants";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getUser();

  if (!user) {
    redirect(ROUTES.LOGIN);
  }

  return (
    <DashboardShell role={user.role} userName={user.name} userEmail={user.email}>
      {children}
    </DashboardShell>
  );
}

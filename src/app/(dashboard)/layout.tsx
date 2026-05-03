import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import DashboardShell from "@/components/dashboard/shell/DashboardShell";
import { getUser } from "@/lib/auth";
import { ROUTES } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getUser();

  if (!user) {
    redirect(ROUTES.LOGIN);
  }

  let hasCounselor: boolean | undefined;
  if (user.role === "STUDENT") {
    const profile = await prisma.studentProfile.findUnique({
      where: { userId: user.id },
      select: { counselorId: true },
    });
    hasCounselor = !!profile?.counselorId;
  }

  return (
    <DashboardShell role={user.role} userName={user.name} userEmail={user.email} hasCounselor={hasCounselor}>
      {children}
    </DashboardShell>
  );
}

import type { ReactNode } from "react";
import { requireRole } from "@/lib/auth";
import { ROLES } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import StudentPortalGuard from "./StudentPortalGuard";

export default async function StudentLayout({ children }: { children: ReactNode }) {
  const user = await requireRole([ROLES.STUDENT]);

  const profile = await prisma.studentProfile.findUnique({
    where: { userId: user.id },
    select: { counselorId: true },
  });

  const hasCounselor = !!profile?.counselorId;

  return (
    <StudentPortalGuard hasCounselor={hasCounselor}>
      {children}
    </StudentPortalGuard>
  );
}

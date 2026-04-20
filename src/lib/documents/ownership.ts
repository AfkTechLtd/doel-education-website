import { ROLES } from "@/lib/constants";
import { getSession, requireRole, type AuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type CurrentStudentContext = {
  user: AuthUser;
  studentProfile: {
    id: string;
    userId: string;
  };
  supabaseUserId: string;
};

export async function getCurrentStudentContext(): Promise<CurrentStudentContext> {
  const user = await requireRole([ROLES.STUDENT]);
  const session = await getSession();

  if (!session) {
    throw new Error("Authentication session not found.");
  }

  const studentProfile = await prisma.studentProfile.findUnique({
    where: { userId: user.id },
    select: { id: true, userId: true },
  });

  if (!studentProfile) {
    throw new Error("Student profile not found.");
  }

  return {
    user,
    studentProfile,
    supabaseUserId: session.user.id,
  };
}

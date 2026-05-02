import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";
import { ROLES } from "@/lib/constants";
import type { ActionResult } from "@/lib/documents/contracts";

/** Student identity resolved from an API request cookie. */
export type ApiStudentContext = {
  userId: string;
  studentProfileId: string;
  supabaseUserId: string;
};

/**
 * Resolves the currently-authenticated student for an API route.
 *
 * Returns an `ActionResult` instead of throwing or redirecting so routes can
 * return proper HTTP status codes (401 / 403) without Next.js redirects.
 */
export async function getApiStudentContext(): Promise<
  ActionResult<ApiStudentContext>
> {
  const user = await getUser();

  if (!user) {
    return { success: false, error: "Unauthorized." };
  }

  if (user.role !== ROLES.STUDENT) {
    return { success: false, error: "Forbidden." };
  }

  const studentProfile = await prisma.studentProfile.findUnique({
    where: { userId: user.id },
    select: { id: true, userId: true },
  });

  if (!studentProfile) {
    return { success: false, error: "Student profile not found." };
  }

  return {
    success: true,
    data: {
      userId: user.id,
      studentProfileId: studentProfile.id,
      supabaseUserId: user.supabaseId,
    },
  };
}

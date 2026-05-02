"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { ROLES } from "@/lib/constants";

// ============================================================
// requestCounselor
// Student requests a counselor assignment.
// Creates a SYSTEM notification for all active admins.
// ============================================================

export async function requestCounselor() {
  const user = await requireRole([ROLES.STUDENT]);

  try {
    // Get all active admins
    const admins = await prisma.user.findMany({
      where: { role: "ADMIN", isActive: true },
      select: { id: true },
    });

    if (admins.length === 0) {
      return { success: true as const }; // No admins yet, silently succeed
    }

    // Create a notification for each admin
    await prisma.notification.createMany({
      data: admins.map((admin) => ({
        userId: admin.id,
        type: "SYSTEM" as const,
        title: "New Student Awaiting Assignment",
        body: `${user.name} has joined and is requesting a counselor. Please assign one in the Assignments section.`,
        link: "/admin/assignments",
      })),
    });

    revalidatePath("/student");
    return { success: true as const };
  } catch {
    return { success: false as const, error: "Failed to send request. Please try again." };
  }
}

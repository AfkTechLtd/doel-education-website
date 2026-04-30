"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { ROLES } from "@/lib/constants";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Role } from "@prisma/client";

// ============================================================
// createAccount
// Admin provisions a new student or counselor account.
// Creates the Supabase Auth user first, then the Prisma record.
// Rolls back the auth user if the DB write fails.
// ============================================================

export async function createAccount(payload: {
  name: string;
  email: string;
  password: string;
  role: "STUDENT" | "COUNSELOR";
}) {
  await requireRole([ROLES.ADMIN]);

  const supabaseAdmin = createAdminClient();

  // 1. Create the Supabase Auth user (pre-confirmed, no email needed)
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email: payload.email,
    password: payload.password,
    email_confirm: true,
  });

  if (authError || !authData.user) {
    const msg = authError?.message ?? "Failed to create auth account";
    // Surface readable Supabase errors
    if (msg.includes("already registered") || msg.includes("already been registered")) {
      return { success: false as const, error: "An account with this email already exists." };
    }
    return { success: false as const, error: msg };
  }

  const supabaseId = authData.user.id;

  try {
    // 2. Create the Prisma User record
    const user = await prisma.user.create({
      data: {
        supabaseId,
        email: payload.email,
        name: payload.name,
        role: payload.role,
        isActive: true,
      },
    });

    // 3. For students, bootstrap a StudentProfile so the app can use it immediately
    if (payload.role === "STUDENT") {
      await prisma.studentProfile.create({
        data: { userId: user.id },
      });
    }

    revalidatePath("/admin/users");
    return { success: true as const };
  } catch (err) {
    // Roll back the Supabase Auth user to avoid orphan accounts
    await supabaseAdmin.auth.admin.deleteUser(supabaseId);

    const message = err instanceof Error ? err.message : "Unknown error";
    if (message.includes("Unique constraint") || message.includes("unique")) {
      return { success: false as const, error: "An account with this email already exists." };
    }
    return { success: false as const, error: "Failed to create account. Please try again." };
  }
}

// ============================================================
// getUsers
// Returns all users, optionally filtered by role.
// ============================================================

export async function getUsers(role?: Role) {
  await requireRole([ROLES.ADMIN]);

  try {
    const users = await prisma.user.findMany({
      where: role ? { role } : undefined,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        studentProfile: {
          select: {
            id: true,
            kanbanStage: true,
            counselorId: true,
            counselor: { select: { id: true, name: true } },
            application: { select: { status: true } },
          },
        },
        counselorStudents: {
          select: { id: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return { success: true as const, data: users };
  } catch {
    return { success: false as const, error: "Failed to fetch users" };
  }
}

// ============================================================
// getCounselors
// Returns all counselor accounts with their assigned student count.
// ============================================================

export async function getCounselors() {
  await requireRole([ROLES.ADMIN]);

  try {
    const counselors = await prisma.user.findMany({
      where: { role: "COUNSELOR", isActive: true },
      select: {
        id: true,
        name: true,
        email: true,
        isActive: true,
        createdAt: true,
        counselorStudents: {
          select: {
            id: true,
            kanbanStage: true,
            user: { select: { name: true, email: true } },
            application: { select: { status: true } },
          },
        },
      },
      orderBy: { name: "asc" },
    });

    return { success: true as const, data: counselors };
  } catch {
    return { success: false as const, error: "Failed to fetch counselors" };
  }
}

// ============================================================
// getStudentsForAssignment
// Returns all student profiles with their current counselor assignment.
// ============================================================

export async function getStudentsForAssignment() {
  await requireRole([ROLES.ADMIN]);

  try {
    const students = await prisma.studentProfile.findMany({
      include: {
        user: { select: { id: true, name: true, email: true, createdAt: true } },
        counselor: { select: { id: true, name: true, email: true } },
        application: { select: { status: true } },
        documents: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return { success: true as const, data: students };
  } catch {
    return { success: false as const, error: "Failed to fetch students" };
  }
}

// ============================================================
// assignCounselor
// Assigns a counselor to a student profile.
// Overwrites any existing assignment.
// ============================================================

export async function assignCounselor(studentProfileId: string, counselorId: string) {
  await requireRole([ROLES.ADMIN]);

  try {
    // Validate counselor exists and has the right role
    const counselor = await prisma.user.findFirst({
      where: { id: counselorId, role: "COUNSELOR", isActive: true },
    });

    if (!counselor) return { success: false as const, error: "Counselor not found" };

    await prisma.studentProfile.update({
      where: { id: studentProfileId },
      data: { counselorId },
    });

    revalidatePath("/admin/assignments");
    return { success: true as const };
  } catch {
    return { success: false as const, error: "Failed to assign counselor" };
  }
}

// ============================================================
// unassignCounselor
// Removes the counselor assignment from a student profile.
// ============================================================

export async function unassignCounselor(studentProfileId: string) {
  await requireRole([ROLES.ADMIN]);

  try {
    await prisma.studentProfile.update({
      where: { id: studentProfileId },
      data: { counselorId: null },
    });

    revalidatePath("/admin/assignments");
    return { success: true as const };
  } catch {
    return { success: false as const, error: "Failed to unassign counselor" };
  }
}

// ============================================================
// autoAssignCounselors
// Round-robin assigns all unassigned students across active counselors.
// ============================================================

export async function autoAssignCounselors() {
  await requireRole([ROLES.ADMIN]);

  try {
    const [unassigned, counselors] = await Promise.all([
      prisma.studentProfile.findMany({
        where: { counselorId: null },
        select: { id: true },
      }),
      prisma.user.findMany({
        where: { role: "COUNSELOR", isActive: true },
        select: { id: true },
        orderBy: { createdAt: "asc" },
      }),
    ]);

    if (counselors.length === 0) {
      return { success: false as const, error: "No active counselors available" };
    }

    const updates = unassigned.map((student, index) => {
      const counselor = counselors[index % counselors.length];
      return prisma.studentProfile.update({
        where: { id: student.id },
        data: { counselorId: counselor.id },
      });
    });

    await prisma.$transaction(updates);

    revalidatePath("/admin/assignments");
    return { success: true as const, count: unassigned.length };
  } catch {
    return { success: false as const, error: "Failed to auto-assign counselors" };
  }
}

// ============================================================
// toggleUserActive
// Deactivates or reactivates a user account.
// Cannot deactivate yourself.
// ============================================================

export async function toggleUserActive(targetUserId: string, isActive: boolean) {
  const admin = await requireRole([ROLES.ADMIN]);

  if (targetUserId === admin.id) {
    return { success: false as const, error: "Cannot deactivate your own account" };
  }

  try {
    await prisma.user.update({
      where: { id: targetUserId },
      data: { isActive },
    });

    revalidatePath("/admin/users");
    return { success: true as const };
  } catch {
    return { success: false as const, error: "Failed to update user" };
  }
}

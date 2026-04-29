"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { ROLES } from "@/lib/constants";
import type { KanbanStage, DocumentStatus, CounselorNoteStage } from "@prisma/client";

// ============================================================
// getMyStudents
// Returns all students assigned to the current counselor with
// their application, document counts, and kanban stage.
// ============================================================

export async function getMyStudents() {
  const user = await requireRole([ROLES.COUNSELOR]);

  try {
    const students = await prisma.studentProfile.findMany({
      where: { counselorId: user.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            isActive: true,
          },
        },
        application: {
          select: {
            id: true,
            status: true,
            targetUniversity: true,
            degreeProgram: true,
            startTerm: true,
            targetYear: true,
            submittedAt: true,
            updatedAt: true,
          },
        },
        documents: {
          orderBy: { createdAt: "desc" },
        },
        requirements: true,
      },
      orderBy: { updatedAt: "desc" },
    });

    return { success: true as const, data: students };
  } catch {
    return { success: false as const, error: "Failed to fetch students" };
  }
}

// ============================================================
// getStudentDetail
// Returns the full student record (profile, application sections,
// documents, counselor notes) for a student the counselor owns.
// ============================================================

export async function getStudentDetail(studentProfileId: string) {
  const user = await requireRole([ROLES.COUNSELOR]);

  try {
    const student = await prisma.studentProfile.findFirst({
      where: { id: studentProfileId, counselorId: user.id },
      include: {
        user: true,
        application: true,
        documents: { orderBy: { createdAt: "desc" } },
        requirements: true,
      },
    });

    if (!student) return { success: false as const, error: "Student not found" };

    const notes = await prisma.counselorNote.findMany({
      where: { studentId: studentProfileId, counselorId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return { success: true as const, data: { ...student, notes } };
  } catch {
    return { success: false as const, error: "Failed to fetch student details" };
  }
}

// ============================================================
// updateKanbanStage
// Moves a student to a different Kanban column.
// Only the assigned counselor may do this.
// ============================================================

export async function updateKanbanStage(studentProfileId: string, stage: KanbanStage) {
  const user = await requireRole([ROLES.COUNSELOR]);

  try {
    const profile = await prisma.studentProfile.findFirst({
      where: { id: studentProfileId, counselorId: user.id },
    });

    if (!profile) return { success: false as const, error: "Student not found" };

    await prisma.studentProfile.update({
      where: { id: studentProfileId },
      data: { kanbanStage: stage },
    });

    revalidatePath("/counselor/kanban");
    revalidatePath("/counselor/students");
    return { success: true as const };
  } catch {
    return { success: false as const, error: "Failed to update kanban stage" };
  }
}

// ============================================================
// updateDocumentStatus
// Counselor verifies or rejects a student document.
// Only documents belonging to the counselor's students are writable.
// ============================================================

export async function updateDocumentStatus(
  documentId: string,
  status: DocumentStatus,
  notes?: string,
) {
  const user = await requireRole([ROLES.COUNSELOR]);

  try {
    const document = await prisma.document.findFirst({
      where: {
        id: documentId,
        student: { counselorId: user.id },
      },
      include: { requirement: true },
    });

    if (!document) return { success: false as const, error: "Document not found" };

    // Update the DocumentRequirement status (since Document no longer has status)
    await prisma.documentRequirement.update({
      where: { id: document.requirementId },
      data: {
        status,
      },
    });

    // Update document notes and verification metadata
    await prisma.document.update({
      where: { id: documentId },
      data: {
        notes: notes ?? document.notes,
        verifiedAt: status === "VERIFIED" ? new Date() : document.verifiedAt,
        verifiedBy: status === "VERIFIED" ? user.id : document.verifiedBy,
      },
    });

    revalidatePath("/counselor/students");
    return { success: true as const };
  } catch {
    return { success: false as const, error: "Failed to update document status" };
  }
}

// ============================================================
// addCounselorNote
// Creates a note on a student at the given pipeline stage.
// ============================================================

export async function addCounselorNote(
  studentProfileId: string,
  stage: CounselorNoteStage,
  content: string,
) {
  const user = await requireRole([ROLES.COUNSELOR]);

  try {
    const profile = await prisma.studentProfile.findFirst({
      where: { id: studentProfileId, counselorId: user.id },
    });

    if (!profile) return { success: false as const, error: "Student not found" };

    await prisma.counselorNote.create({
      data: {
        studentId: studentProfileId,
        counselorId: user.id,
        stage,
        content,
      },
    });

    revalidatePath(`/counselor/students/${studentProfileId}`);
    return { success: true as const };
  } catch {
    return { success: false as const, error: "Failed to add note" };
  }
}

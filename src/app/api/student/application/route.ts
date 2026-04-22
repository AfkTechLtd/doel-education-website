import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// --- GET: Fetch Application Progress & Data ---
export async function GET() {
  try {
    const user = await getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId: user.id },
    });

    if (!studentProfile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    const application = await prisma.application.findUnique({
      where: { studentId: studentProfile.id },
      include: {
        sections: true,
        student: { include: { user: true } }
      },
    });

    if (!application) {
      return NextResponse.json({ application: null, status: "NOT_STARTED" });
    }

    return NextResponse.json({ application });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// --- PATCH: Save Progress (Upsert) ---
export async function PATCH(req: Request) {
  try {
    const user = await getUser();
    const { step, data } = await req.json();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId: user.id },
    });

    if (!studentProfile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    const application = await prisma.application.upsert({
      where: { studentId: studentProfile.id },
      update: { updatedAt: new Date() },
      create: { studentId: studentProfile.id, status: "IN_PROGRESS" },
    });

    const sectionMap: Record<number, any> = {
      1: "ONE", 2: "TWO", 3: "THREE", 4: "FOUR"
    };

    await prisma.applicationSection.upsert({
      where: {
        applicationId_sectionNumber: {
          applicationId: application.id,
          sectionNumber: sectionMap[step],
        }
      },
      update: { data, isComplete: true },
      create: {
        applicationId: application.id,
        sectionNumber: sectionMap[step],
        data,
        isComplete: true
      }
    });

    await prisma.application.update({
      where: { id: application.id },
      data: { completedSections: step }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// --- POST: Final Submission ---
export async function POST() {
  try {
    const user = await getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId: user.id },
    });

    if (!studentProfile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    await prisma.application.update({
      where: { studentId: studentProfile.id },
      data: {
        status: "UNDER_REVIEW",
        submittedAt: new Date()
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}

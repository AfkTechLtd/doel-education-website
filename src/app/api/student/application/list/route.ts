import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // 1. Authenticate the user
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId: user.id },
      include: {
        application: {
          select: {
            id: true,
            status: true,
            submittedAt: true,
            updatedAt: true,
            intendedUniversity: true,
            intendedProgram: true,
          }
        }
      }
    });

    if (!studentProfile) {
      return NextResponse.json({ error: "Student profile not found" }, { status: 404 });
    }

    // 3. Format the response as an array (a list)
    const applicationsList = studentProfile.application ? [studentProfile.application] : [];

    return NextResponse.json({ applications: applicationsList });

  } catch (error) {
    console.error("Error fetching application list:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

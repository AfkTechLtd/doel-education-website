import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }) {
  try {
    // 1. Authenticate the user
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const applicationId = resolvedParams.id;

    if (!applicationId) {
      return NextResponse.json({ error: "Application ID is required" }, { status: 400 });
    }

    // 2. Fetch the application with its sections and student relation
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        sections: true,
        student: true, // Included so we can verify ownership
      },
    });

    // 3. Handle Not Found
    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    // 4. Security Check (IDOR Prevention)
    // Ensure the user trying to view this application is actually the student who owns it.
    // (If you have Admin/Counselor roles, you would expand this logic to allow them access too)
    if (application.student.userId !== user.id && user.role === "STUDENT") {
      return NextResponse.json({ error: "Forbidden. You do not have access to this application." }, { status: 403 });
    }

    // 5. Return the application data
    // The sections array will contain SECTION_4, which your frontend will pick up.
    return NextResponse.json(application);

  } catch (error) {
    console.error("Error fetching application details:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

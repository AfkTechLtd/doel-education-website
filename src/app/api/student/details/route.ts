import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";



export const GET = async () => {
  const user = await getUser();
  const userId = user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const student = await prisma.studentProfile.findUnique({
      where: { userId: userId },
      include: {
        user: true
      }
    });
    if (!student) {
      return NextResponse.json({ error: "Student not found." + student }, { status: 404 });
    }
    return NextResponse.json({ student });
  } catch (error) {
    NextResponse.json({ error: "Failed to fetch student details. " + error }, { status: 500 });
  }
}

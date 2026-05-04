import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  studentName: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email address"),
  programInterest: z.string().min(1, "Program interest is required"),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      { error: firstIssue?.message ?? "Invalid input." },
      { status: 400 }
    );
  }

  try {
    await prisma.inquiry.create({
      data: {
        studentName: parsed.data.studentName,
        phone: parsed.data.phone,
        email: parsed.data.email,
        programInterest: parsed.data.programInterest,
        message: parsed.data.message ?? null,
      },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("[inquiry] DB error:", err);
    return NextResponse.json(
      { error: "Failed to save inquiry. Please try again." },
      { status: 500 }
    );
  }
}

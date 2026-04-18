import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  supabaseId: z.string().min(1),
  email: z.string().email(),
  name: z.string().min(1),
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
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  const { supabaseId, email, name } = parsed.data;

  try {
    // Idempotent — skip if user already exists
    const existing = await prisma.user.findUnique({ where: { supabaseId } });
    if (existing) {
      return NextResponse.json({ ok: true });
    }

    await prisma.user.create({
      data: {
        supabaseId,
        email,
        name,
        role: "STUDENT",
        studentProfile: {
          create: {},
        },
      },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("[register] DB error:", err);
    return NextResponse.json(
      { error: "Failed to create user record." },
      { status: 500 },
    );
  }
}

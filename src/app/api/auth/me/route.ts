import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }
    return NextResponse.json({ role: user.role, id: user.id, name: user.name });
  } catch {
    return NextResponse.json({ error: "Internal error." }, { status: 500 });
  }
}

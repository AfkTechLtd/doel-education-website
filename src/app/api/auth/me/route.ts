import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";

const ROLE_COOKIE = "doel-role";

export async function GET() {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }
    const response = NextResponse.json({ role: user.role, id: user.id, name: user.name });
    response.cookies.set(ROLE_COOKIE, user.role, {
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      httpOnly: false, // middleware reads it — must be readable in Edge context
      maxAge: 60 * 60 * 24 * 7, // 1 week, refreshed on each login
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Internal error." }, { status: 500 });
  }
}

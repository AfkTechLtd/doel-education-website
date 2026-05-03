import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { ROLE_DASHBOARD, ROUTES, type RoleType } from "@/lib/constants";

// Routes that require authentication (dashboard prefix patterns)
const DASHBOARD_PREFIXES = ["/student", "/counselor", "/admin"];

// Role → allowed path prefix
const ROLE_PREFIX: Record<RoleType, string> = {
  STUDENT: "/student",
  COUNSELOR: "/counselor",
  ADMIN: "/admin",
};

// Cookie name written by /api/auth/me at login time
const ROLE_COOKIE = "doel-role";

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Refresh session — MUST be called before any redirects
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // ── Redirect authenticated users away from login ──────────────
  if (pathname === ROUTES.LOGIN || pathname === ROUTES.REGISTER) {
    if (authUser) {
      const role = request.cookies.get(ROLE_COOKIE)?.value as RoleType | undefined;
      if (role && ROLE_DASHBOARD[role]) {
        return NextResponse.redirect(new URL(ROLE_DASHBOARD[role], request.url));
      }
    }
    return supabaseResponse;
  }

  // ── Protect dashboard routes ──────────────────────────────────
  const isDashboardRoute = DASHBOARD_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (!isDashboardRoute) {
    return supabaseResponse;
  }

  // No session → redirect to login
  if (!authUser) {
    const loginUrl = new URL(ROUTES.LOGIN, request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Read role from cookie — set by /api/auth/me at login time
  const role = request.cookies.get(ROLE_COOKIE)?.value as RoleType | undefined;

  if (role) {
    const allowedPrefix = ROLE_PREFIX[role];
    if (allowedPrefix && !pathname.startsWith(allowedPrefix)) {
      return NextResponse.redirect(
        new URL(ROLE_DASHBOARD[role], request.url),
      );
    }
  }

  return supabaseResponse;
}

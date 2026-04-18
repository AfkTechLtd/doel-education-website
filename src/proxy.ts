import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ROLE_DASHBOARD, ROUTES, type RoleType } from "@/lib/constants";

// Routes that require authentication (dashboard prefix patterns)
const DASHBOARD_PREFIXES = ["/student", "/counselor", "/admin"];

// Role → allowed path prefix
const ROLE_PREFIX: Record<RoleType, string> = {
  STUDENT: "/student",
  COUNSELOR: "/counselor",
  ADMIN: "/admin",
};

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
      // Look up their role and redirect to the correct dashboard
      try {
        const dbUser = await prisma.user.findUnique({
          where: { supabaseId: authUser.id },
          select: { role: true },
        });
        if (dbUser) {
          const dest = ROLE_DASHBOARD[dbUser.role as RoleType];
          return NextResponse.redirect(new URL(dest, request.url));
        }
      } catch {
        // If DB lookup fails, fall through and let them reach login
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

  // Fetch user role from DB for RBAC enforcement
  try {
    const dbUser = await prisma.user.findUnique({
      where: { supabaseId: authUser.id },
      select: { role: true },
    });

    if (!dbUser) {
      // User exists in Supabase but not in our DB — send to login
      return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    }

    const allowedPrefix = ROLE_PREFIX[dbUser.role as RoleType];

    // If the user is trying to access a dashboard section they don't own, redirect
    if (!pathname.startsWith(allowedPrefix)) {
      return NextResponse.redirect(
        new URL(ROLE_DASHBOARD[dbUser.role as RoleType], request.url),
      );
    }
  } catch {
    // DB error — fail safe by redirecting to login
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - public folder files (images, svgs, etc.)
     */
    "/((?!_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};

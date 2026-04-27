import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { ROLE_DASHBOARD, ROUTES, type RoleType } from "@/lib/constants";
import type { User } from "@prisma/client";

// ============================================================
// Types
// ============================================================

export type AuthUser = User;

// ============================================================
// getSession
// Returns the current Supabase session from cookies (server-side).
// Returns null if no valid session exists.
// ============================================================

export async function getSession() {
  const supabase = await createClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) return null;
  return session;
}

// ============================================================
// getUser
// Returns the Prisma User row for the current session user.
// Returns null if no session or user not found in DB.
// ============================================================

// Wrapped with React cache() so that multiple callers within the same request
// (e.g. requireRole + getCurrentStudentContext + API middleware) share one result.
export const getUser = cache(async (): Promise<AuthUser | null> => {
  const supabase = await createClient();
  const {
    data: { user: supabaseUser },
    error,
  } = await supabase.auth.getUser();

  if (error || !supabaseUser) return null;

  const user = await prisma.user.findUnique({
    where: { supabaseId: supabaseUser.id },
  });

  return user;
});

// ============================================================
// requireAuth
// Calls getUser; redirects to /login if no session or user.
// Returns the authenticated User row.
// ============================================================

export async function requireAuth(): Promise<AuthUser> {
  const user = await getUser();
  if (!user) {
    redirect(ROUTES.LOGIN);
  }
  return user;
}

// ============================================================
// requireRole
// Calls requireAuth; redirects to the user's role dashboard
// if their role is not in the allowedRoles list.
// ============================================================

export async function requireRole(allowedRoles: RoleType[]): Promise<AuthUser> {
  const user = await requireAuth();

  if (!allowedRoles.includes(user.role as RoleType)) {
    redirect(ROLE_DASHBOARD[user.role as RoleType]);
  }

  return user;
}

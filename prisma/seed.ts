/**
 * Seed script — creates one Supabase Auth user + Prisma User row for each role.
 *
 * Run:  npx tsx prisma/seed.ts
 *
 * Credentials after seeding:
 *   Admin     → admin@doel.dev       / Seed@1234
 *   Counselor → counselor@doel.dev   / Seed@1234
 *   Student   → student@doel.dev     / Seed@1234
 */

import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// ── Clients ────────────────────────────────────────────────────────────────

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // service role can create users
);

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// ── Seed data ──────────────────────────────────────────────────────────────

const SEED_PASSWORD = "Seed@1234";

const USERS = [
  {
    email: "admin@doel.dev",
    name: "Admin User",
    role: "ADMIN" as const,
  },
  {
    email: "counselor@doel.dev",
    name: "Counselor User",
    role: "COUNSELOR" as const,
  },
  {
    email: "student@doel.dev",
    name: "Student User",
    role: "STUDENT" as const,
  },
] as const;

// ── Helpers ────────────────────────────────────────────────────────────────

async function upsertAuthUser(email: string, name: string) {
  // Check if auth user already exists
  const { data: existing } = await supabase.auth.admin.listUsers();
  const found = existing?.users?.find((u) => u.email === email);

  if (found) {
    console.log(`  ↩  Auth user already exists: ${email}`);
    return found.id;
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password: SEED_PASSWORD,
    email_confirm: true, // skip email confirmation
    user_metadata: { name },
  });

  if (error) throw new Error(`Failed to create auth user ${email}: ${error.message}`);
  console.log(`  ✔  Created auth user: ${email}`);
  return data.user.id;
}

async function upsertDbUser(
  supabaseId: string,
  email: string,
  name: string,
  role: "ADMIN" | "COUNSELOR" | "STUDENT",
) {
  const existing = await prisma.user.findUnique({ where: { supabaseId } });

  if (existing) {
    console.log(`  ↩  DB user already exists: ${email} (${role})`);
    return existing;
  }

  const user = await prisma.user.create({
    data: {
      supabaseId,
      email,
      name,
      role,
      ...(role === "STUDENT" ? { studentProfile: { create: {} } } : {}),
    },
  });

  console.log(`  ✔  Created DB user: ${email} (${role})`);
  return user;
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log("\n🌱 Seeding users...\n");

  for (const u of USERS) {
    console.log(`→ ${u.role}: ${u.email}`);
    const supabaseId = await upsertAuthUser(u.email, u.name);
    await upsertDbUser(supabaseId, u.email, u.name, u.role);
    console.log();
  }

  console.log("✅ Seed complete.\n");
  console.log("Credentials:");
  console.log("  Admin      → admin@doel.dev       / Seed@1234  → /admin");
  console.log("  Counselor  → counselor@doel.dev   / Seed@1234  → /counselor");
  console.log("  Student    → student@doel.dev     / Seed@1234  → /student");
  console.log();
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

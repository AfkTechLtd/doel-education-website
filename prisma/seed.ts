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

const RESOURCE_FILE_URL = "/test_content/test_document.pdf";

const RESOURCES = [
  {
    id: "resource_sop",
    slug: "sop",
    name: "SOP",
    type: "SOP" as const,
    description:
      "Browse statement of purpose templates for academic, scholarship, and career-focused applications.",
  },
  {
    id: "resource_lor",
    slug: "lor",
    name: "LOR",
    type: "LOR" as const,
    description:
      "Explore recommendation letter templates for academic, professional, and leadership use cases.",
  },
  {
    id: "resource_affidavit",
    slug: "affidavit",
    name: "Affidavit",
    type: "AFFIDAVIT" as const,
    description:
      "Review affidavit templates for sponsorship, family support, and self-funding documentation.",
  },
] as const;

const RESOURCE_TEMPLATES = [
  {
    slug: "research-goals-sop",
    resourceSlug: "sop",
    title: "Research Goals SOP",
    description:
      "A showcase SOP template focused on research interests, faculty alignment, and long-term academic plans.",
    type: "SOP" as const,
    content:
      "Use this sample structure to introduce your academic background, explain your research motivation, connect with your target program, and close with future goals.",
  },
  {
    slug: "career-pivot-sop",
    resourceSlug: "sop",
    title: "Career Pivot SOP",
    description:
      "A showcase SOP template for applicants changing discipline or moving from work experience into a new graduate path.",
    type: "SOP" as const,
    content:
      "Use this sample structure to explain the turning point behind your transition, highlight transferable experience, and show why this degree is the right next step.",
  },
  {
    slug: "scholarship-impact-sop",
    resourceSlug: "sop",
    title: "Scholarship Impact SOP",
    description:
      "A showcase SOP template emphasizing merit, financial context, and the impact you plan to create after graduation.",
    type: "SOP" as const,
    content:
      "Use this sample structure to balance academic merit, scholarship fit, and the outcomes you want to achieve through graduate study.",
  },
  {
    slug: "professor-evaluation-lor",
    resourceSlug: "lor",
    title: "Professor Evaluation LOR",
    description:
      "A showcase recommendation template highlighting academic performance, curiosity, and readiness for advanced study.",
    type: "LOR" as const,
    content:
      "Use this sample structure to frame the recommender relationship, describe academic strengths, add concrete examples, and close with a clear endorsement.",
  },
  {
    slug: "research-supervisor-lor",
    resourceSlug: "lor",
    title: "Research Supervisor LOR",
    description:
      "A showcase recommendation template for students who contributed to lab work, projects, or supervised research.",
    type: "LOR" as const,
    content:
      "Use this sample structure to summarize the project context, the student’s role, their technical strengths, and their research potential.",
  },
  {
    slug: "workplace-leadership-lor",
    resourceSlug: "lor",
    title: "Workplace Leadership LOR",
    description:
      "A showcase recommendation template for applicants using employer feedback to demonstrate initiative and professional growth.",
    type: "LOR" as const,
    content:
      "Use this sample structure to describe the reporting relationship, workplace impact, leadership examples, and graduate-level readiness.",
  },
  {
    slug: "parent-sponsorship-affidavit",
    resourceSlug: "affidavit",
    title: "Parent Sponsorship Affidavit",
    description:
      "A showcase affidavit template for tuition and living expense support provided by a parent sponsor.",
    type: "AFFIDAVIT" as const,
    content:
      "Use this sample structure to declare the sponsor relationship, funding commitment, source of income, and signature requirements.",
  },
  {
    slug: "family-support-affidavit",
    resourceSlug: "affidavit",
    title: "Family Support Affidavit",
    description:
      "A showcase affidavit template for students supported by siblings, relatives, or extended family members.",
    type: "AFFIDAVIT" as const,
    content:
      "Use this sample structure to identify the sponsor, describe the support arrangement, summarize proof of funds, and complete the declaration block.",
  },
  {
    slug: "self-funding-affidavit",
    resourceSlug: "affidavit",
    title: "Self-Funding Affidavit",
    description:
      "A showcase affidavit template for applicants who are financing their own degree through savings or income.",
    type: "AFFIDAVIT" as const,
    content:
      "Use this sample structure to explain self-funding capacity, covered expenses, source of funds, and confirmation statements.",
  },
] as const;

// ── Helpers ────────────────────────────────────────────────────────────────

async function upsertAuthUser(email: string, name: string) {
  // Check if auth user already exists
  const { data: existing } = await supabase.auth.admin.listUsers();
  const found = existing?.users?.find((u) => u.email === email);

  if (found) {
    return found.id;
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password: SEED_PASSWORD,
    email_confirm: true, // skip email confirmation
    user_metadata: { name },
  });

  if (error) throw new Error(`Failed to create auth user ${email}: ${error.message}`);
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

  return user;
}

async function seedResourcesAndTemplates() {

  const resourceIdBySlug = new Map<string, string>();

  for (const resource of RESOURCES) {
    const savedResource = await prisma.resource.upsert({
      where: { slug: resource.slug },
      update: {
        name: resource.name,
        description: resource.description,
        type: resource.type,
        isActive: true,
      },
      create: {
        id: resource.id,
        slug: resource.slug,
        name: resource.name,
        description: resource.description,
        type: resource.type,
        isActive: true,
      },
    });

    resourceIdBySlug.set(resource.slug, savedResource.id);
  }

  for (const template of RESOURCE_TEMPLATES) {
    const resourceId = resourceIdBySlug.get(template.resourceSlug);

    if (!resourceId) {
      throw new Error(`Missing resource mapping for template slug: ${template.slug}`);
    }

    await prisma.resourceTemplate.upsert({
      where: { slug: template.slug },
      update: {
        title: template.title,
        description: template.description,
        type: template.type,
        content: template.content,
        fileUrl: RESOURCE_FILE_URL,
        isPublic: true,
        resourceId,
      },
      create: {
        slug: template.slug,
        title: template.title,
        description: template.description,
        type: template.type,
        content: template.content,
        fileUrl: RESOURCE_FILE_URL,
        isPublic: true,
        resourceId,
      },
    });

  }

}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {

  for (const u of USERS) {
    const supabaseId = await upsertAuthUser(u.email, u.name);
    await upsertDbUser(supabaseId, u.email, u.name, u.role);
  }

  await seedResourcesAndTemplates();
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

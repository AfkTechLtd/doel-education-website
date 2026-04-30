// scripts/backfill-requirements.ts
import "dotenv/config";
import { prisma } from "@/lib/prisma";

const STANDARD_REQUIREMENTS = [
  { name: "Passport", description: "Upload a clear passport copy for verification." },
  { name: "Academic Transcript", description: "Upload your latest academic transcript document." },
  { name: "Statement of Purpose", description: "Upload your SOP draft document for review." },
  { name: "Financial Proof", description: "Upload your financial proof or bank statement." },
  { name: "Letter of Recommendation 1", description: "Upload the first signed recommendation letter." },
];

async function main() {
  console.log("Starting requirement backfill...");

  // 1. Get all students
  const students = await prisma.studentProfile.findMany({
    include: { requirements: true }
  });

  for (const student of students) {
    // 2. Skip if they already have requirements
    if (student.requirements.length > 0) {
      console.log(`Student ${student.id} already has requirements. Skipping.`);
      continue;
    }

    // 3. Create the standard checklist for this student
    const requirementsToCreate = STANDARD_REQUIREMENTS.map(req => ({
      ...req,
      studentId: student.id,
      status: "PENDING" as const,
    }));

    await prisma.documentRequirement.createMany({
      data: requirementsToCreate,
    });

    console.log(`✅ Created ${requirementsToCreate.length} requirements for Student ${student.id}`);
  }

  console.log("Backfill complete!");
}

main()
  .catch((e) => {
    console.error("❌ Backfill failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

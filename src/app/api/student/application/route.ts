import type { NextApiRequest, NextApiResponse } from 'next'
import { getUser } from "@/lib/auth"; // Ensure this helper works in API routes
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await getUser();

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Find the student profile first
  const studentProfile = await prisma.studentProfile.findUnique({
    where: { userId: user.id },
    include: { application: true }
  });

  if (!studentProfile) {
    return res.status(404).json({ error: "Student profile not found." });
  }

  const studentId = studentProfile.id;

  // --- GET: Fetch Application Progress & Data ---
  if (req.method === 'GET') {
    try {
      const application = await prisma.application.findUnique({
        where: { studentId },
        include: {
          sections: true, // Include the JSON data for each step
        }
      });

      if (!application) {
        // If no application exists yet, return NOT_STARTED status
        return res.status(200).json({ status: "NOT_STARTED", completedSections: 0 });
      }

      return res.status(200).json({ application });
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch application." });
    }
  }

  // --- PATCH: Save Progress (Step by Step) ---
  if (req.method === 'PATCH') {
    const { step, data } = req.body;

    try {
      // 1. Ensure Application record exists
      const application = await prisma.application.upsert({
        where: { studentId },
        update: { updatedAt: new Date() },
        create: {
          studentId,
          status: "IN_PROGRESS"
        },
      });

      // 2. Map numeric step to Enum (Assuming your SectionNumber is ONE, TWO, etc.)
      const sectionMap: Record<number, any> = {
        1: "ONE", 2: "TWO", 3: "THREE", 4: "FOUR"
      };

      // 3. Upsert the specific section data
      await prisma.applicationSection.upsert({
        where: {
          applicationId_sectionNumber: {
            applicationId: application.id,
            sectionNumber: sectionMap[step],
          }
        },
        update: { data, isComplete: true },
        create: {
          applicationId: application.id,
          sectionNumber: sectionMap[step],
          data,
          isComplete: true
        }
      });

      // 4. Update overall progress on main Application table
      await prisma.application.update({
        where: { id: application.id },
        data: { completedSections: step }
      });

      return res.status(200).json({ message: "Progress saved." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to save progress." });
    }
  }

  // --- POST: Final Submission ---
  if (req.method === 'POST') {
    try {
      const application = await prisma.application.findUnique({
        where: { studentId }
      });

      if (!application) return res.status(404).json({ error: "No application to submit." });

      await prisma.application.update({
        where: { id: application.id },
        data: {
          status: "SUBMITTED",
          submittedAt: new Date()
        }
      });

      // Optional: Update Student Profile Kanban Stage
      await prisma.studentProfile.update({
        where: { id: studentId },
        data: { kanbanStage: "REVIEW" } // Or whatever your enum value is
      });

      return res.status(200).json({ message: "Application submitted successfully." });
    } catch (error) {
      return res.status(500).json({ error: "Submission failed." });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

// /src/app/(dashboard)/student/documents/page.tsx
import StudentDocumentVaultPageContent from "@/components/dashboard/student/StudentDocumentVaultPageContent";
import { getCurrentStudentContext } from "@/lib/documents/ownership";
import { prisma } from "@/lib/prisma";

export default async function StudentDocumentsPage() {
  const { studentProfile } = await getCurrentStudentContext();

  // 1. Fetch the requirements and their attached documents directly from the DB
  const dbRequirements = await prisma.documentRequirement.findMany({
    where: { studentId: studentProfile.id },
    include: { documents: true },
    orderBy: { createdAt: 'asc' }
  });

  // 2. Format Requirements for the UI
  const requirements = dbRequirements.map(req => ({
    id: req.id,
    name: req.name,
    description: req.description || "",
    status: req.status,
    documents: req.documents, // The files attached to this requirement
  }));

  // 3. Flatten the documents for the "All Files" view tab
  const documents = dbRequirements.flatMap(req =>
    req.documents.map(doc => ({
      id: doc.id,
      requirementId: req.id,
      name: doc.name,
      type: req.name, // The "type" is essentially the requirement name now
      status: req.status, // Inherits status directly from the requirement
      storageUrl: doc.storageUrl,
      mimeType: doc.mimeType,
      sizeBytes: doc.sizeBytes,
      uploadedAt: doc.uploadedAt,
      verifiedAt: doc.verifiedAt,
      verifiedBy: doc.verifiedBy,
      notes: doc.notes
    }))
  );

  return (
    <StudentDocumentVaultPageContent
      documents={documents}
      requirements={requirements}
    />
  );
}

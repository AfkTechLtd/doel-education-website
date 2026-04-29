// /src/app/(dashboard)/student/documents/page.tsx
import StudentDocumentVaultPageContent from "@/components/dashboard/student/StudentDocumentVaultPageContent";
import { getCurrentStudentContext } from "@/lib/documents/ownership";
import { prisma } from "@/lib/prisma";
import type { DocumentItem, RequirementWithDocuments } from "@/lib/documents/types";

export default async function StudentDocumentsPage() {
  const { studentProfile } = await getCurrentStudentContext();

  // 1. Fetch the requirements and their attached documents directly from the DB
  // Note: documents is Document? (singular optional) due to @unique on Document.requirementId
  const dbRequirements = await prisma.documentRequirement.findMany({
    where: { studentId: studentProfile.id },
    include: { documents: true },
    orderBy: { createdAt: 'asc' }
  });

  // 2. Format Requirements for the UI
  const requirements: RequirementWithDocuments[] = dbRequirements.map(req => ({
    id: req.id,
    name: req.name,
    description: req.description || "",
    status: req.status as any, // Prisma enum maps to string
    documents: req.documents ? {
      id: req.documents.id,
      name: req.documents.name,
      type: req.documents.type,
      storagePath: req.documents.storagePath,
      storageUrl: req.documents.storageUrl,
      bucket: req.documents.bucket,
      mimeType: req.documents.mimeType,
      sizeBytes: req.documents.sizeBytes,
      notes: req.documents.notes,
      uploadedAt: req.documents.uploadedAt?.toISOString() ?? null,
      verifiedAt: req.documents.verifiedAt?.toISOString() ?? null,
      verifiedBy: req.documents.verifiedBy,
      status: req.status as any,
    } : null,
  }));

  // 3. Flatten the documents for the "All Files" view tab
  // documents is singular optional (Document?), not an array
  const documents: DocumentItem[] = dbRequirements
    .filter(req => req.documents !== null)
    .map(req => ({
      id: req.documents!.id,
      name: req.documents!.name,
      type: req.name, // The "type" is essentially the requirement name now
      storagePath: req.documents!.storagePath,
      storageUrl: req.documents!.storageUrl,
      bucket: req.documents!.bucket,
      mimeType: req.documents!.mimeType,
      sizeBytes: req.documents!.sizeBytes,
      notes: req.documents!.notes,
      uploadedAt: req.documents!.uploadedAt?.toISOString() ?? null,
      verifiedAt: req.documents!.verifiedAt?.toISOString() ?? null,
      verifiedBy: req.documents!.verifiedBy,
      status: req.status as any,
    }));

  return (
    <StudentDocumentVaultPageContent
      documents={documents}
      requirements={requirements}
    />
  );
}

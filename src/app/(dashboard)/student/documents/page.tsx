import StudentDocumentVaultPageContent from "@/components/dashboard/student/StudentDocumentVaultPageContent";
import { studentDocumentRequirements } from "@/data/student-document-requirements";
import { studentDocuments } from "@/data/student-documents";
import { requireRole } from "@/lib/auth";
import { ROLES } from "@/lib/constants";

export default async function StudentDocumentsPage() {
  await requireRole([ROLES.STUDENT]);

  return (
    <StudentDocumentVaultPageContent
      documents={studentDocuments}
      requirements={studentDocumentRequirements}
    />
  );
}

import StudentDocumentVaultPageContent from "@/components/dashboard/student/StudentDocumentVaultPageContent";
import { studentDocumentRequirements } from "@/data/student-document-requirements";
import { listRequiredDocumentLinks, listStudentDocuments } from "@/actions/documents";
import { requireRole } from "@/lib/auth";
import { ROLES } from "@/lib/constants";

export default async function StudentDocumentsPage() {
  await requireRole([ROLES.STUDENT]);
  const documentsResult = await listStudentDocuments();
  const requiredLinksResult = await listRequiredDocumentLinks();

  return (
    <StudentDocumentVaultPageContent
      documents={documentsResult.data ?? []}
      requirements={studentDocumentRequirements}
      requiredLinks={requiredLinksResult.data ?? []}
    />
  );
}

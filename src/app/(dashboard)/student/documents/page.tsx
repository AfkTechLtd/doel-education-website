import StudentDocumentVaultPageContent from "@/components/dashboard/student/StudentDocumentVaultPageContent";
import { studentDocumentRequirements } from "@/data/student-document-requirements";
import { getCachedStudentDocuments, getCachedRequiredDocumentLinks } from "@/lib/data/documents";
import { getCurrentStudentContext } from "@/lib/documents/ownership";

export default async function StudentDocumentsPage() {
  const { studentProfile } = await getCurrentStudentContext();

  const [documents, requiredLinks] = await Promise.all([
    getCachedStudentDocuments(studentProfile.id),
    getCachedRequiredDocumentLinks(studentProfile.id),
  ]);

  return (
    <StudentDocumentVaultPageContent
      documents={documents}
      requirements={studentDocumentRequirements}
      requiredLinks={requiredLinks}
    />
  );
}

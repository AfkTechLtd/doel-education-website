"use client";

import { useState } from "react";
import DashboardPageHeader from "@/components/dashboard/shared/DashboardPageHeader";
import type { StudentDocumentRequirement } from "@/data/student-document-requirements";
import type { LocalStudentDocument } from "@/data/student-documents";
import StudentDocumentUploadModal from "./StudentDocumentUploadModal";
import StudentDocumentVault from "./StudentDocumentVault";

type StudentDocumentVaultPageContentProps = {
  documents: LocalStudentDocument[];
  requirements: StudentDocumentRequirement[];
};

export default function StudentDocumentVaultPageContent({
  documents,
  requirements,
}: StudentDocumentVaultPageContentProps) {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        title="Document Vault"
        description="Upload, organize, and track the documents needed for your application."
        action={
          <button
            type="button"
            onClick={() => setIsUploadOpen(true)}
            className="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 font-inter text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            Upload Document
          </button>
        }
      />

      <StudentDocumentVault documents={documents} requirements={requirements} />

      <StudentDocumentUploadModal
        open={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
      />
    </div>
  );
}

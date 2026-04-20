"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardPageHeader from "@/components/dashboard/shared/DashboardPageHeader";
import type { StudentDocumentRequirement } from "@/data/student-document-requirements";
import type { RequiredDocumentLinkItem, VaultDocumentListItem } from "@/lib/documents/types";
import StudentDocumentUploadModal from "./StudentDocumentUploadModal";
import StudentDocumentVault from "./StudentDocumentVault";

type StudentDocumentVaultPageContentProps = {
  documents: VaultDocumentListItem[];
  requirements: StudentDocumentRequirement[];
  requiredLinks: RequiredDocumentLinkItem[];
};

export default function StudentDocumentVaultPageContent({
  documents,
  requirements,
  requiredLinks,
}: StudentDocumentVaultPageContentProps) {
  const router = useRouter();
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

      <StudentDocumentVault
        documents={documents}
        requirements={requirements}
        requiredLinks={requiredLinks}
      />

      <StudentDocumentUploadModal
        open={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadComplete={() => {
          setIsUploadOpen(false);
          router.refresh();
        }}
      />
    </div>
  );
}

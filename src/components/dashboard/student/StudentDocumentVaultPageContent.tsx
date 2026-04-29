// /src/components/dashboard/student/StudentDocumentVaultPageContent.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardPageHeader from "@/components/dashboard/shared/DashboardPageHeader";
import StudentDocumentUploadModal from "./StudentDocumentUploadModal";
import StudentDocumentVault from "./StudentDocumentVault";

type StudentDocumentVaultPageContentProps = {
  documents: any[]; // You can type these strictly based on the mapping in page.tsx
  requirements: any[];
};

export default function StudentDocumentVaultPageContent({
  documents,
  requirements,
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
      />

      <StudentDocumentUploadModal
        open={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadComplete={() => {
          setIsUploadOpen(false);
          router.refresh();
        }}
        requirements={requirements}
        existingRequiredLinks={requiredLinks}
      />
    </div>
  );
}

// /src/components/dashboard/student/StudentDocumentUploadModal.tsx
"use client";
import { useEffect } from "react";
import { X } from "lucide-react";
import DocumentUploader from "@/components/common/documents/DocumentUploader";
import type { RequirementWithDocuments, SelectedDocumentReference } from "@/lib/documents/types";

type StudentDocumentUploadModalProps = {
  open: boolean;
  onClose: () => void;
  onUploadComplete: (documents: SelectedDocumentReference[]) => void;
  requirements?: RequirementWithDocuments[];
};

export default function StudentDocumentUploadModal({
  open,
  onClose,
  onUploadComplete,
  requirements,
}: StudentDocumentUploadModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-3 py-4 sm:px-4 sm:py-6">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close upload modal"
        onClick={onClose}
      />
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-[2rem]">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-5 sm:px-7 sm:py-6">
          <div>
            <h2 className="font-poppins text-2xl font-semibold text-slate-900">
              Upload Document
            </h2>
            <p className="mt-2 font-inter text-sm leading-relaxed text-slate-500">
              Add a file to your vault for review, tracking, and later matching
              to your application requirements.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
            aria-label="Close upload modal"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div className="min-h-0 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
          <DocumentUploader
            onCancel={onClose}
            onUploadComplete={onUploadComplete}
            requirements={requirements}
          />
        </div>
      </div>
    </div>
  );
}

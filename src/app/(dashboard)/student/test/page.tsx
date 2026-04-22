"use client";

import { useState } from "react";
import { DocumentPickerTrigger } from "@/components/common/documents";
import { useToast } from "@/components/common/feedback/ToastProvider";
import DashboardPageHeader from "@/components/dashboard/shared/DashboardPageHeader";
import type { SelectedDocumentReference } from "@/lib/documents/types";

export default function TestPage() {
  const [selectedDocument, setSelectedDocument] =
    useState<SelectedDocumentReference | null>(null);
  const { showToast } = useToast();

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Test"
        title="Document Picker Trigger Test"
        description="Use this page to test the reusable callback-based picker trigger with developer-controlled upload restrictions."
      />

      <section className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
        <div className="flex flex-wrap items-center gap-4">
          <DocumentPickerTrigger
            title="Choose Test Document"
            uploadConfig={{
              multiple: false,
              maxFiles: 1,
              maxFileSizeBytes: 5 * 1024 * 1024,
              accept: {
                "application/pdf": [".pdf"],
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                  [".docx"],
              },
            }}
            onSelect={async (document) => {
              setSelectedDocument(document);
              showToast({
                variant: "success",
                title: "Document selected",
                description: document.name,
              });
            }}
          >
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 font-inter text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Open Document Picker
            </button>
          </DocumentPickerTrigger>

          {selectedDocument ? (
            <button
              type="button"
              onClick={() => {
                setSelectedDocument(null);
                showToast({
                  variant: "info",
                  title: "Selection cleared",
                });
              }}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 font-inter text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
            >
              Clear Selected File
            </button>
          ) : null}
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 font-inter text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Current trigger config</p>
          <div className="mt-3 space-y-1.5">
            <p>
              Allowed upload extensions:{" "}
              <span className="font-medium text-slate-800">.pdf, .docx</span>
            </p>
            <p>
              Multiple upload:{" "}
              <span className="font-medium text-slate-800">No</span>
            </p>
            <p>
              Max files: <span className="font-medium text-slate-800">1</span>
            </p>
            <p>
              Max file size:{" "}
              <span className="font-medium text-slate-800">5 MB</span>
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
          {selectedDocument ? (
            <div className="space-y-2 font-inter text-sm text-slate-600">
              <p>
                <span className="font-semibold text-slate-900">Name:</span>{" "}
                {selectedDocument.name}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Type:</span>{" "}
                {selectedDocument.type}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Status:</span>{" "}
                {selectedDocument.status}
              </p>
              <p>
                <span className="font-semibold text-slate-900">
                  Document ID:
                </span>{" "}
                {selectedDocument.id}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Bucket:</span>{" "}
                {selectedDocument.bucket ?? "-"}
              </p>
              <p>
                <span className="font-semibold text-slate-900">
                  Storage Path:
                </span>{" "}
                {selectedDocument.storagePath ?? "-"}
              </p>
            </div>
          ) : (
            <p className="font-inter text-sm text-slate-500">
              No document selected yet. Use the button above to test the
              reusable picker trigger.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

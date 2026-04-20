"use client";

import { useMemo, useState } from "react";
import StudentDocumentUploadZone from "@/components/dashboard/student/StudentDocumentUploadZone";
import type { SelectedDocumentReference } from "@/lib/documents/types";

type UploadNewDocumentPanelProps = {
  onSelect: (document: SelectedDocumentReference) => void;
  allowedTypes?: string[];
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export default function UploadNewDocumentPanel({
  onSelect,
  allowedTypes,
}: UploadNewDocumentPanelProps) {
  const [uploadedDocuments, setUploadedDocuments] = useState<SelectedDocumentReference[]>([]);

  const filteredUploadedDocuments = useMemo(() => {
    const normalizedAllowedTypes = (allowedTypes ?? []).map(normalize);

    if (!normalizedAllowedTypes.length) {
      return uploadedDocuments;
    }

    return uploadedDocuments.filter((document) => {
      return normalizedAllowedTypes.some((allowedType) =>
        normalize(document.name).includes(allowedType),
      );
    });
  }, [allowedTypes, uploadedDocuments]);

  return (
    <div className="space-y-5">
      <StudentDocumentUploadZone
        onCancel={() => {
          // No-op in picker tab; closing is handled by the parent modal.
        }}
        showCancel={false}
        submitLabel="Upload New"
        onUploadComplete={(documents) => {
          setUploadedDocuments(documents);
          if (documents.length === 1) {
            onSelect(documents[0]);
          }
        }}
      />

      {uploadedDocuments.length > 1 ? (
        <div className="space-y-3 rounded-[1.6rem] border border-slate-200 bg-white p-4 shadow-sm">
          <p className="font-poppins text-lg font-semibold text-slate-900">
            Choose uploaded file
          </p>

          <div className="space-y-3">
            {filteredUploadedDocuments.map((document) => (
              <div
                key={document.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-inter text-sm font-semibold text-slate-800">
                    {document.name}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onSelect(document)}
                  className="inline-flex items-center justify-center rounded-2xl bg-primary px-4 py-2 font-inter text-sm font-semibold text-white transition hover:bg-primary/90"
                >
                  Use This File
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

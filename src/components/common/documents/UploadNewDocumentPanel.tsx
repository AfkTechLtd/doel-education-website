"use client";

import { useMemo, useState } from "react";
import DocumentUploader from "@/components/common/documents/DocumentUploader";
import type {
  DocumentUploadConfig,
  SelectedDocumentReference,
} from "@/lib/documents/types";

type UploadNewDocumentPanelProps = {
  onSelect: (document: SelectedDocumentReference) => void;
  uploadConfig?: DocumentUploadConfig;
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

/**
 * Upload tab for the shared document picker.
 *
 * New uploads are stored in the vault first and then returned back to the
 * picker flow. If a single file is uploaded, it is auto-selected immediately.
 */
export default function UploadNewDocumentPanel({
  onSelect,
  uploadConfig,
}: UploadNewDocumentPanelProps) {
  const [uploadedDocuments, setUploadedDocuments] = useState<SelectedDocumentReference[]>([]);

  const filteredUploadedDocuments = useMemo(() => {
    const normalizedAllowedTypes = (uploadConfig?.allowedDocumentTypes ?? []).map(normalize);

    if (!normalizedAllowedTypes.length) {
      return uploadedDocuments;
    }

    return uploadedDocuments.filter((document) => {
      return normalizedAllowedTypes.some((allowedType) => {
        const normalizedDocumentType = normalize(document.type);
        return normalizedDocumentType.includes(allowedType) || allowedType.includes(normalizedDocumentType);
      });
    });
  }, [uploadConfig?.allowedDocumentTypes, uploadedDocuments]);

  return (
    <div className="space-y-5">
      <DocumentUploader
        onCancel={() => {
          // No-op in picker tab; closing is handled by the parent modal.
        }}
        showCancel={false}
        submitLabel="Upload New"
        uploadConfig={uploadConfig}
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

          <div className="max-h-60 space-y-3 overflow-y-auto pr-1">
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

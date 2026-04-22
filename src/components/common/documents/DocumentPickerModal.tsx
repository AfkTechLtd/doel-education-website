"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type {
  DocumentUploadConfig,
  SelectedDocumentReference,
} from "@/lib/documents/types";
import { cn } from "@/lib/utils";
import UploadNewDocumentPanel from "./UploadNewDocumentPanel";
import VaultDocumentSelector from "./VaultDocumentSelector";

type DocumentPickerModalProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (document: SelectedDocumentReference) => void;
  title?: string;
  uploadConfig?: DocumentUploadConfig;
};

type PickerTab = "VAULT" | "UPLOAD";

/**
 * Shared document picker modal used by any field that needs a document.
 *
 * Students can either choose an existing vault file or upload a new file that
 * is automatically added to their vault. The selected document is returned via
 * `onSelect` as a normalized `SelectedDocumentReference`.
 */
export default function DocumentPickerModal({
  open,
  onClose,
  onSelect,
  title = "Choose Document",
  uploadConfig,
}: DocumentPickerModalProps) {
  const [activeTab, setActiveTab] = useState<PickerTab>("VAULT");

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

  function handleClose() {
    setActiveTab("VAULT");
    onClose();
  }

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-3 py-4 sm:px-4 sm:py-6">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close document picker"
        onClick={handleClose}
      />

      <div className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-[2rem]">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-5 sm:px-7 sm:py-6">
          <div>
            <h2 className="font-poppins text-2xl font-semibold text-slate-900">
              {title}
            </h2>
            <p className="mt-2 font-inter text-sm leading-relaxed text-slate-500">
              Choose from your vault or upload a new file. New uploads are
              automatically added to your vault.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
            aria-label="Close document picker"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="border-b border-slate-200 px-5 py-4 sm:px-7">
          <div className="inline-flex rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab("VAULT")}
              className={cn(
                "rounded-[0.9rem] px-4 py-2.5 font-inter text-sm font-semibold transition",
                activeTab === "VAULT"
                  ? "bg-primary text-white"
                  : "text-slate-500 hover:text-slate-900",
              )}
            >
              From Vault
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("UPLOAD")}
              className={cn(
                "rounded-[0.9rem] px-4 py-2.5 font-inter text-sm font-semibold transition",
                activeTab === "UPLOAD"
                  ? "bg-primary text-white"
                  : "text-slate-500 hover:text-slate-900",
              )}
            >
              Upload New
            </button>
          </div>
        </div>

        <div className="min-h-0 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
          {activeTab === "VAULT" ? (
            <VaultDocumentSelector
              onSelect={(document) => {
                onSelect(document);
                handleClose();
              }}
              allowedDocumentTypes={uploadConfig?.allowedDocumentTypes}
            />
          ) : (
            <UploadNewDocumentPanel
              onSelect={(document) => {
                onSelect(document);
                handleClose();
              }}
              uploadConfig={uploadConfig}
            />
          )}
        </div>
      </div>
    </div>
  );
}

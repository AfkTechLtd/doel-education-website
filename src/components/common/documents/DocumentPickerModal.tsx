"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { SelectedDocumentReference } from "@/lib/documents/types";
import { cn } from "@/lib/utils";
import UploadNewDocumentPanel from "./UploadNewDocumentPanel";
import VaultDocumentSelector from "./VaultDocumentSelector";

type DocumentPickerModalProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (document: SelectedDocumentReference) => void;
  title?: string;
  allowedTypes?: string[];
};

type PickerTab = "VAULT" | "UPLOAD";

export default function DocumentPickerModal({
  open,
  onClose,
  onSelect,
  title = "Choose Document",
  allowedTypes,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-4 py-6">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close document picker"
        onClick={handleClose}
      />

      <div className="relative z-10 w-full max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl sm:p-7">
        <div className="mb-5 flex items-start justify-between gap-4 border-b border-slate-200 pb-5">
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

        <div className="mb-5 inline-flex rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
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

        {activeTab === "VAULT" ? (
          <VaultDocumentSelector
            onSelect={(document) => {
              onSelect(document);
              handleClose();
            }}
            allowedTypes={allowedTypes}
          />
        ) : (
          <UploadNewDocumentPanel
            onSelect={(document) => {
              onSelect(document);
              handleClose();
            }}
            allowedTypes={allowedTypes}
          />
        )}
      </div>
    </div>
  );
}

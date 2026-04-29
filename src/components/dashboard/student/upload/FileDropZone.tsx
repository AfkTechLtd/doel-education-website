"use client";

import { UploadCloud } from "lucide-react";
import type { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";
import { cn } from "@/lib/utils";

type FileDropZoneProps = {
  getRootProps: (props?: DropzoneRootProps) => DropzoneRootProps;
  getInputProps: (props?: DropzoneInputProps) => DropzoneInputProps;
  isDragActive: boolean;
  isDragReject: boolean;
  onBrowse: () => void;
  disabled?: boolean;
};

export default function FileDropZone({
  getRootProps,
  getInputProps,
  isDragActive,
  isDragReject,
  onBrowse,
  disabled = false,
}: FileDropZoneProps) {
  return (
    <div
      {...getRootProps()}
      className={cn(
        "rounded-[1.75rem] border border-dashed px-6 py-8 text-center transition",
        isDragReject
          ? "border-red-300 bg-red-50"
          : isDragActive
            ? "border-primary bg-primary/5"
            : "border-slate-300 bg-slate-50",
      )}
    >
      <input {...getInputProps()} />
      <div className="mx-auto flex max-w-xl flex-col items-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary ring-1 ring-primary/10">
          <UploadCloud className="h-6 w-6" aria-hidden="true" />
        </div>

        <h2 className="mt-5 font-poppins text-xl font-semibold text-slate-900 sm:text-2xl">
          {isDragActive
            ? "Drop your files here"
            : "Drop files here or browse from your device"}
        </h2>
        <p className="mt-2 max-w-lg font-inter text-sm leading-relaxed text-slate-500">
          Add one or more files to your vault for review and tracking. PDF, JPG, PNG, and DOCX are supported.
        </p>
        <p className="mt-2 font-inter text-sm text-slate-400">
          Use clear file names like <span className="font-medium text-slate-500">passport.pdf</span> or <span className="font-medium text-slate-500">sop.docx</span> for easier matching later.
        </p>

        <button
          type="button"
          onClick={onBrowse}
          disabled={disabled}
          className="mt-6 inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-2.5 font-inter text-sm font-semibold text-white transition hover:bg-primary/90"
        >
          Add Files
        </button>
      </div>
    </div>
  );
}

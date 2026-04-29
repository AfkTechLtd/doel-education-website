"use client";

type UploadFooterProps = {
  showCancel?: boolean;
  submitLabel?: string;
  isUploading: boolean;
  canUpload: boolean;
  onCancel: () => void;
  onUpload: () => void;
};

export default function UploadFooter({
  showCancel = true,
  submitLabel = "Upload Files",
  isUploading,
  canUpload,
  onCancel,
  onUpload,
}: UploadFooterProps) {
  return (
    <div className="flex items-center justify-end gap-3">
      {showCancel ? (
        <button
          type="button"
          onClick={onCancel}
          disabled={isUploading}
          className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2.5 font-inter text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
        >
          Cancel
        </button>
      ) : null}
      <button
        type="button"
        onClick={onUpload}
        disabled={!canUpload || isUploading}
        className="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-2.5 font-inter text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {isUploading ? "Uploading..." : submitLabel}
      </button>
    </div>
  );
}

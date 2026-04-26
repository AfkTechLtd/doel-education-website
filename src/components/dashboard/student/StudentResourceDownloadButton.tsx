"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { getResourceTemplateSignedUrl } from "@/actions/resources";
import { useToast } from "@/components/common/feedback/ToastProvider";

type StudentResourceDownloadButtonProps = {
  categorySlug: string;
  templateSlug: string;
  downloadName?: string;
  disabled?: boolean;
};

export default function StudentResourceDownloadButton({
  categorySlug,
  templateSlug,
  downloadName,
  disabled = false,
}: StudentResourceDownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  async function handleDownload() {
    if (isLoading || disabled) return;
    setIsLoading(true);

    const result = await getResourceTemplateSignedUrl(
      categorySlug,
      templateSlug,
      300, // 5 minutes for downloads
    );

    if (!result.success || !result.data) {
      showToast({
        variant: "error",
        title: "Download failed",
        description: result.error ?? "Could not generate download link.",
      });
      setIsLoading(false);
      return;
    }

    const link = window.document.createElement("a");
    link.href = result.data.signedUrl;
    link.download = downloadName ?? "resource";
    link.target = "_blank";
    link.rel = "noreferrer";
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);

    setIsLoading(false);
  }

  if (disabled) {
    return (
      <button
        type="button"
        disabled
        className="inline-flex min-h-11 w-full cursor-not-allowed items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2.5 font-inter text-sm font-semibold text-slate-400 sm:min-w-[9rem] sm:w-auto"
        aria-label="Resource download unavailable"
      >
        Download
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isLoading}
      className="inline-flex min-h-11 w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-center font-inter text-sm font-semibold text-slate-700 transition hover:border-primary/30 hover:text-primary sm:min-w-[9rem] sm:w-auto disabled:opacity-60"
      aria-label={downloadName ? `Download ${downloadName}` : "Download resource template"}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        "Download"
      )}
    </button>
  );
}

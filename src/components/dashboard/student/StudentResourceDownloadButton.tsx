type StudentResourceDownloadButtonProps = {
  href?: string | null;
  downloadName?: string;
};

export default function StudentResourceDownloadButton({
  href,
  downloadName,
}: StudentResourceDownloadButtonProps) {
  if (!href) {
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
    <a
      href={href}
      download={downloadName}
      className="inline-flex min-h-11 w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-center font-inter text-sm font-semibold text-slate-700 transition hover:border-primary/30 hover:text-primary sm:min-w-[9rem] sm:w-auto"
      aria-label={downloadName ? `Download ${downloadName}` : "Download resource template"}
    >
      Download
    </a>
  );
}

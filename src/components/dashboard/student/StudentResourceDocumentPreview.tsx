import type { LocalResourceTemplate } from "@/lib/resources/types";
import StudentTemplatePreview from "./StudentTemplatePreview";
import StudentResourceDownloadButton from "./StudentResourceDownloadButton";

type StudentResourceDocumentPreviewProps = {
  resource: LocalResourceTemplate;
  categorySlug: string;
  templateSlug: string;
  signedUrl: string | null;
};

function isPdfFile(url: string | null) {
  return url ? /\.pdf($|\?)/i.test(url) : false;
}

function isImageFile(url: string | null) {
  return url ? /\.(png|jpe?g|gif|webp|svg)($|\?)/i.test(url) : false;
}

export default function StudentResourceDocumentPreview({
  resource,
  categorySlug,
  templateSlug,
  signedUrl,
}: StudentResourceDocumentPreviewProps) {
  function getSuggestedDownloadName(
    resourceSlug: string,
    url: string | null,
  ) {
    if (!url) {
      return resourceSlug;
    }

    const sanitizedUrl = url.split("?")[0] ?? url;
    const extensionMatch = sanitizedUrl.match(/\.[a-z0-9]+$/i);

    return `${resourceSlug}${extensionMatch?.[0] ?? ""}`;
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[1.45rem] border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-200 bg-slate-50 px-4 py-4 sm:px-5 sm:py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              Live Preview
            </p>
            <p className="mt-1 font-inter text-sm text-slate-500">
              {signedUrl
                ? "The attached sample file is loaded below."
                : "No file is attached yet, so a visual template preview is shown instead."}
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:justify-end">
            {signedUrl ? (
              <a
                href={signedUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-center font-inter text-sm font-semibold text-slate-700 transition hover:border-primary/30 hover:text-primary sm:min-w-[9rem] sm:w-auto"
              >
                Open in New Tab
              </a>
            ) : null}
            <StudentResourceDownloadButton
              categorySlug={categorySlug}
              templateSlug={templateSlug}
              downloadName={getSuggestedDownloadName(
                resource.slug,
                signedUrl,
              )}
              disabled={!signedUrl}
            />
          </div>
        </div>

        {signedUrl ? (
          isPdfFile(signedUrl) ? (
            <div className="overflow-x-auto overscroll-x-contain bg-slate-950">
              <div className="min-w-[720px] sm:min-w-0">
                <iframe
                  src={signedUrl}
                  title={`${resource.title} document preview`}
                  className="block h-[24rem] w-full bg-white sm:h-[32rem] md:h-[40rem] xl:h-[46rem]"
                />
              </div>
            </div>
          ) : isImageFile(signedUrl) ? (
            <div className="flex items-center justify-center bg-slate-50 p-6">
              {/* Resource files may come from dynamic storage URLs, so use a plain image tag here. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={signedUrl}
                alt={`${resource.title} preview`}
                className="max-h-[46rem] w-full rounded-[1.2rem] object-contain"
              />
            </div>
          ) : (
            <div className="flex min-h-[20rem] items-center justify-center bg-slate-50 p-8 text-center">
              <div className="max-w-md space-y-3">
                <p className="font-poppins text-xl font-semibold text-slate-900">
                  Preview unavailable for this file type
                </p>
                <p className="font-inter text-sm leading-relaxed text-slate-500">
                  Open the resource in a new tab or use the download button to
                  access the full document.
                </p>
              </div>
            </div>
          )
        ) : (
          <div className="aspect-[4/4.4] overflow-hidden">
            <div className="h-full w-full">
              <StudentTemplatePreview
                type={resource.type}
                title={resource.title}
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

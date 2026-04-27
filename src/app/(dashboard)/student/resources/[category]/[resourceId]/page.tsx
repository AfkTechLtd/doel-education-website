import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getCachedResourceTemplateDetail } from "@/lib/data/resources";
import StudentResourceDocumentPreview from "@/components/dashboard/student/StudentResourceDocumentPreview";
import DashboardPageHeader from "@/components/dashboard/shared/DashboardPageHeader";
import { requireRole } from "@/lib/auth";
import { ROLES } from "@/lib/constants";

export default async function StudentResourcePreviewPage({
  params,
}: {
  params: Promise<{ category: string; resourceId: string }>;
}) {
  await requireRole([ROLES.STUDENT]);

  const { category, resourceId } = await params;
  const detail = await getCachedResourceTemplateDetail(category, resourceId);

  if (!detail) notFound();

  const { resource: resourceCategory, template: resource } = detail;
  const hasAttachedFile = Boolean(resource.fileUrl);
  const detailDescription =
    resource.description ??
    (hasAttachedFile
      ? "Review the live template preview and download the attached sample file."
      : "Review this resource template and use the guidance below while preparing your document.");

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex">
        <Link
          href={`/student/resources/${resourceCategory.slug}`}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 font-inter text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900 sm:w-auto"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Back to {resourceCategory.title} templates
        </Link>
      </div>

      <DashboardPageHeader
        // eyebrow="Template Preview"
        title={resource.title}
        description={detailDescription}
      />

      <StudentResourceDocumentPreview resource={resource} />
    </div>
  );
}

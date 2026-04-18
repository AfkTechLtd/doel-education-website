import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";
import StudentResourceDocumentPreview from "@/components/dashboard/student/StudentResourceDocumentPreview";
import StudentResourceDownloadButton from "@/components/dashboard/student/StudentResourceDownloadButton";
import DashboardPageHeader from "@/components/dashboard/shared/DashboardPageHeader";
import { requireRole } from "@/lib/auth";
import { ROLES } from "@/lib/constants";
import { getResourceCategoryById } from "@/data/student-resource-categories";
import { getResourceById } from "@/data/student-resource-templates";

export default async function StudentResourcePreviewPage({
  params,
}: {
  params: Promise<{ category: string; resourceId: string }>;
}) {
  await requireRole([ROLES.STUDENT]);

  const { category, resourceId } = await params;
  const resourceCategory = getResourceCategoryById(category);
  const resource = getResourceById(resourceId);

  if (!resourceCategory || !resource || resource.categoryId !== resourceCategory.id) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href={`/student/resources/${resourceCategory.id}`}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 font-inter text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Back to {resourceCategory.title} templates
        </Link>

        <div className="flex items-center gap-3">
          <p className="font-inter text-sm text-slate-400">Available soon</p>
          <StudentResourceDownloadButton />
        </div>
      </div>

      <DashboardPageHeader
        eyebrow="Template Preview"
        title={resource.title}
        description={resource.description ?? "Preview this template before downloads are enabled."}
        action={
          <span className="inline-flex rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 font-inter text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            {resource.type === "AFFIDAVIT" ? "Affidavit" : resource.type}
          </span>
        }
      />

      <StudentResourceDocumentPreview resource={resource} />
    </div>
  );
}

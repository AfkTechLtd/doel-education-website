import DashboardStatusBadge from "@/components/dashboard/shared/DashboardStatusBadge";
import type { StudentDocumentRequirement } from "@/data/student-document-requirements";

type StudentRequiredDocumentCardProps = {
  requirement: StudentDocumentRequirement;
};

export default function StudentRequiredDocumentCard({
  requirement,
}: StudentRequiredDocumentCardProps) {
  return (
    <article className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-poppins text-lg font-semibold text-slate-900">
            {requirement.label}
          </h3>
          <p className="mt-1 font-inter text-sm text-slate-500">{requirement.type}</p>
        </div>

        <DashboardStatusBadge status={requirement.status.replaceAll("_", " ")} />
      </div>

      <div className="mt-4 space-y-3">
        <p className="font-inter text-sm text-slate-500">
          {requirement.linkedFileName
            ? `Linked file: ${requirement.linkedFileName}`
            : "No file uploaded yet"}
        </p>
        <p className="font-inter text-sm leading-relaxed text-slate-500">
          {requirement.helperText}
        </p>
      </div>
    </article>
  );
}

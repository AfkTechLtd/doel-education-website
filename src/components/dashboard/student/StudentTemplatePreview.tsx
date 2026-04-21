import type { ResourceTemplateType } from "@/data/student-resource-categories";

type StudentTemplatePreviewProps = {
  type: ResourceTemplateType;
  title: string;
};

function Line({
  width,
  tone = "bg-slate-300",
}: {
  width: string;
  tone?: string;
}) {
  return (
    <div
      className={`h-2 rounded-full ${tone}`}
      style={{ width }}
      aria-hidden="true"
    />
  );
}

function SopPreview({ title }: { title: string }) {
  return (
    <div
      className="
      flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5
      shadow-sm
      transition-colors duration-300
      group-hover:border-primary group-hover:shadow-md
    "
    >
      <div className="rounded-2xl bg-primary px-4 py-3 text-white">
        <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.22em] text-white/75">
          Personal Essay
        </p>
        <p className="mt-2 font-poppins text-lg font-semibold leading-tight">
          {title}
        </p>
      </div>

      <div className="mt-4 space-y-3">
        <Line width="68%" tone="bg-slate-900" />
        <Line width="96%" />
        <Line width="88%" />
        <Line width="94%" />
      </div>

      <div className="mt-4 rounded-2xl bg-secondary/18 p-4">
        <Line width="54%" tone="bg-secondary" />
        <div className="mt-3 space-y-2">
          <Line width="92%" tone="bg-amber-200" />
          <Line width="81%" tone="bg-amber-200" />
        </div>
      </div>

      <div className="mt-4 space-y-2.5">
        <Line width="100%" />
        <Line width="93%" />
        <Line width="86%" />
      </div>
    </div>
  );
}

function LorPreview({ title }: { title: string }) {
  return (
    <div
      className="
      flex h-full flex-col rounded-[1.6rem] border border-slate-200 bg-white p-5
      shadow-sm
      transition-colors duration-300
      group-hover:border-primary group-hover:shadow-md
    "
    >
      <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">
            Recommendation
          </p>
          <p className="mt-2 font-poppins text-lg font-semibold leading-tight text-slate-900">
            {title}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-2.5">
        <Line width="42%" tone="bg-slate-700" />
        <Line width="34%" tone="bg-slate-700" />
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="space-y-2.5">
          <Line width="72%" tone="bg-primary/70" />
          <Line width="100%" />
          <Line width="96%" />
          <Line width="92%" />
          <Line width="84%" />
        </div>
      </div>

      <div className="mt-auto pt-5">
        <Line width="36%" tone="bg-slate-500" />
        <div className="mt-2 h-px w-full bg-slate-200" />
      </div>
    </div>
  );
}

function AffidavitPreview({ title }: { title: string }) {
  return (
    <div
      className="
      flex h-full flex-col rounded-[1.6rem] border border-slate-200 bg-white p-5
      shadow-sm
      transition-colors duration-300
      group-hover:border-primary group-hover:shadow-md
    "
    >
      <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">
            Declaration
          </p>
          <p className="mt-2 font-poppins text-lg font-semibold leading-tight text-slate-900">
            {title}
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-slate-100 p-3">
          <Line width="70%" tone="bg-slate-600" />
          <div className="mt-2 space-y-2">
            <Line width="100%" />
            <Line width="88%" />
          </div>
        </div>

        <div className="rounded-2xl bg-primary/8 p-3">
          <Line width="64%" tone="bg-primary" />
          <div className="mt-2 space-y-2">
            <Line width="96%" tone="bg-primary/25" />
            <Line width="82%" tone="bg-primary/25" />
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 p-4">
        <div className="space-y-2.5">
          <Line width="100%" />
          <Line width="95%" />
          <Line width="89%" />
          <Line width="93%" />
        </div>
      </div>

      <div className="mt-auto grid grid-cols-2 gap-3 pt-5">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <Line width="58%" tone="bg-slate-500" />
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <Line width="62%" tone="bg-slate-500" />
        </div>
      </div>
    </div>
  );
}

export default function StudentTemplatePreview({
  type,
  title,
}: StudentTemplatePreviewProps) {
  if (type === "LOR") return <LorPreview title={title} />;
  if (type === "AFFIDAVIT") return <AffidavitPreview title={title} />;
  return <SopPreview title={title} />;
}

import Link from "next/link";
import type { ServicesOverviewStage } from "@/components/services/services.types";

type ServicesOverviewCardProps = {
  stage: ServicesOverviewStage;
};

export default function ServicesOverviewCard({ stage }: ServicesOverviewCardProps) {
  const Icon = stage.icon;

  return (
    <Link
      href={stage.href}
      className={`block rounded-[1.5rem] border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${stage.accent}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className={`font-inter text-[11px] font-semibold uppercase tracking-[0.2em] ${stage.accentText}`}
          >
            {stage.stage}
          </p>
          <h3 className="mt-2 font-poppins text-xl font-bold text-slate-900 md:text-2xl">
            {stage.title}
          </h3>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon size={20} />
        </div>
      </div>

      <p className="mt-4 font-inter text-sm leading-relaxed text-slate-600">
        {stage.description}
      </p>

      <div className="mt-6 border-t border-slate-200 pt-4">
        <span className="font-inter text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          {stage.count}
        </span>
      </div>
    </Link>
  );
}

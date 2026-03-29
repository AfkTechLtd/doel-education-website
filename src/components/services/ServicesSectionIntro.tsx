import { ReactNode } from "react";

type ServicesSectionIntroProps = {
  badge: ReactNode;
  title: string;
  description: string;
  className?: string;
};

export default function ServicesSectionIntro({
  badge,
  title,
  description,
  className = "max-w-3xl",
}: ServicesSectionIntroProps) {
  return (
    <div className={className}>
      <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 font-inter text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        {badge}
      </div>
      <h2 className="max-w-3xl font-poppins text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl font-inter text-sm leading-relaxed text-slate-600 md:text-base">
        {description}
      </p>
    </div>
  );
}

interface BlogSectionHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
}

export default function BlogSectionHeader({
  eyebrow,
  title,
  description,
}: BlogSectionHeaderProps) {
  return (
    <div className="max-w-2xl space-y-2.5">
      <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
        {eyebrow}
      </p>
      <h2 className="font-poppins text-2xl font-semibold tracking-tight text-slate-900 md:text-[2rem]">
        {title}
      </h2>
      <p className="font-inter text-sm leading-relaxed text-slate-600 md:text-base">
        {description}
      </p>
    </div>
  );
}

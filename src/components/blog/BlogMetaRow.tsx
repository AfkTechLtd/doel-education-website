import { CalendarDays, Clock3 } from "lucide-react";

interface BlogMetaRowProps {
  category: string;
  date: string;
  readTime: string;
}

export default function BlogMetaRow({
  category,
  date,
  readTime,
}: BlogMetaRowProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-medium text-slate-500">
      <span className="rounded-full bg-primary/8 px-3 py-1 font-inter font-semibold text-primary">
        {category}
      </span>
      <span className="flex items-center gap-1.5 font-inter">
        <CalendarDays size={13} /> {date}
      </span>
      <span className="flex items-center gap-1.5 font-inter">
        <Clock3 size={13} /> {readTime}
      </span>
    </div>
  );
}

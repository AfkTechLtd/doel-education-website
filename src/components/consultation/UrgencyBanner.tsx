import { CalendarClock, Flame } from "lucide-react";

const stats = [
  { icon: Flame, label: "Only 4 slots left this week", highlight: true },
  { icon: CalendarClock, label: "Next Fall intake deadline: Mar 31", highlight: false },
];

export default function UrgencyBanner() {
  return (
    <div className="bg-secondary/10 border-y border-secondary/30">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex flex-wrap items-center justify-center gap-6">
        {stats.map(({ icon: Icon, label, highlight }) => (
          <span key={label} className="flex items-center gap-2 text-sm font-inter font-medium text-slate-700">
            <Icon
              className={`w-4 h-4 shrink-0 ${highlight ? "text-secondary" : "text-primary"}`}
              strokeWidth={2}
            />
            {label}
          </span>
        ))}
        <span className="text-slate-400 text-sm font-inter hidden sm:inline">—</span>
        <span className="text-sm font-semibold text-primary font-inter">Spots fill fast. Book now, it&apos;s free.</span>
      </div>
    </div>
  );
}

import { Users, Mic2, MapPinned, Star } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "1,200+",
    label: "Total Attendees",
    sub: "across all sessions",
  },
  {
    icon: Mic2,
    value: "35",
    label: "Sessions in 2025",
    sub: "online & in-person",
  },
  {
    icon: MapPinned,
    value: "12",
    label: "Cities Reached",
    sub: "across Bangladesh",
  },
  {
    icon: Star,
    value: "4.9",
    label: "Avg. Rating",
    sub: "from post-event surveys",
  },
];

const pastEvents = [
  {
    number: "01",
    title: "Fall 2025 US Admissions Masterclass",
    date: "Jan 18, 2025",
    attendees: "340 attendees",
    outcome:
      "Students left with a personalised 6-university shortlist framework.",
  },
  {
    number: "02",
    title: "Visa Interview Prep  Live Mock Session",
    date: "Feb 8, 2025",
    attendees: "215 attendees",
    outcome:
      "92% of participants reported higher confidence before their embassy appointment.",
  },
  {
    number: "03",
    title: "Scholarship Deep-Dive: Fulbright & Beyond",
    date: "Mar 1, 2025",
    attendees: "180 attendees",
    outcome:
      "Covered 14 funding sources specific to Bangladeshi graduate applicants.",
  },
];

export default function EventHighlights() {
  return (
    <section className="py-12 md:py-16 bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-14">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-8 md:mb-12">
          <p className="text-secondary font-bold tracking-widest uppercase text-sm shrink-0">
            Our Track Record
          </p>
          <div className="flex-1 h-px bg-gray-200" />
          <p className="text-xs text-gray-400 shrink-0 font-medium hidden sm:block">
            Since 2023
          </p>
        </div>

        {/* Stats panel  amber gradient cells matching StatsCounter pattern */}
        <div className="grid grid-cols-2 lg:grid-cols-4 overflow-hidden rounded-2xl border border-gray-100 shadow-lg mb-10 md:mb-14">
          {stats.map((s, index) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className={[
                  "bg-[linear-gradient(180deg,#ffffff_0%,#FFF6E0_100%)] p-5 md:p-8 flex flex-col gap-2 md:gap-3",
                  index % 2 === 0 ? "border-r border-gray-200" : "",
                  index < 2 ? "border-b border-gray-200 lg:border-b-0" : "",
                  index === 0 || index === 1 ? "" : "",
                  index < 3 ? "lg:border-r border-gray-200" : "",
                ].join(" ")}
              >
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-md bg-primary/10 flex items-center justify-center">
                  <Icon size={14} className="text-primary" />
                </div>
                <div>
                  <p className="text-2xl md:text-4xl font-bold text-primary leading-none">
                    {s.value}
                  </p>
                  <p className="text-xs md:text-sm font-semibold text-gray-900 mt-1">
                    {s.label}
                  </p>
                  <p className="text-[10px] md:text-xs text-gray-500 mt-0.5">
                    {s.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Past events  editorial list */}
        <h3 className="text-lg md:text-xl font-semibold font-inter text-gray-900 mb-5 md:mb-6">
          Recent sessions
        </h3>

        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {pastEvents.map((ev) => (
            <div key={ev.number} className="py-5 md:py-6 group">
              {/* Top row: number + title + date (always visible) */}
              <div className="flex items-start gap-4 md:gap-6">
                <span className="text-2xl md:text-3xl font-bold text-gray-200 group-hover:text-primary/20 transition-colors select-none shrink-0 w-8 md:w-10 leading-none pt-0.5">
                  {ev.number}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1 mb-1.5">
                    <h4 className="text-sm md:text-base font-semibold font-inter text-gray-900 group-hover:text-primary transition-colors leading-snug">
                      {ev.title}
                    </h4>
                    {/* Date + attendee badge  inline on desktop, wrap on mobile */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] md:text-xs font-semibold text-gray-400 whitespace-nowrap">
                        {ev.date}
                      </span>
                      <span className="text-[10px] md:text-xs font-bold text-primary bg-primary/8 px-2 py-0.5 rounded-full whitespace-nowrap">
                        {ev.attendees}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                    {ev.outcome}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

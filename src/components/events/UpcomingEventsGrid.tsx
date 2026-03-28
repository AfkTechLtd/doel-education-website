import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  Monitor,
} from "lucide-react";

type EventMode = "Online" | "In-Person" | "Hybrid";

export type EventType =
  | "All"
  | "Webinar"
  | "Visa Session"
  | "Seminar"
  | "Workshop";

export interface EventItem {
  id: number;
  type: EventType;
  typeColor: "teal" | "amber" | "slate";
  title: string;
  date: string;
  time: string;
  mode: EventMode;
  location: string;
  audience: string;
  description: string;
}

export const events: EventItem[] = [
  {
    id: 1,
    type: "Visa Session",
    typeColor: "teal",
    title: "F-1 Student Visa: Common Mistakes and How to Avoid Them",
    date: "29 March 2025",
    time: "6:30 PM BST",
    mode: "Online",
    location: "Zoom",
    audience: "All applicants",
    description:
      "A focused session on DS-160 errors, financial doc pitfalls, and how to handle tough embassy questions.",
  },
  {
    id: 2,
    type: "Seminar",
    typeColor: "slate",
    title: "Choosing Between MS and MBA  Which Path is Right for You?",
    date: "5 April 2025",
    time: "4:00 PM BST",
    mode: "In-Person",
    location: "Doel Dhaka Office",
    audience: "Undergrad & early career",
    description:
      "Career outcome comparison, salary trajectories, and program fit analysis with our senior advisors.",
  },
  {
    id: 3,
    type: "Workshop",
    typeColor: "amber",
    title: "SOP Writing Clinic  Live Feedback on Your Draft",
    date: "12 April 2025",
    time: "5:00 PM BST",
    mode: "Hybrid",
    location: "Dhaka Office + Zoom",
    audience: "Active applicants",
    description:
      "Bring your SOP draft. Our counselors will review live and show you exactly what strong statements look like.",
  },
  {
    id: 4,
    type: "Webinar",
    typeColor: "teal",
    title: "STEM OPT & Post-Graduation Work Rights in the USA",
    date: "19 April 2025",
    time: "7:00 PM BST",
    mode: "Online",
    location: "Zoom",
    audience: "Engineering & tech students",
    description:
      "Everything about CPT, OPT, and the 3-year STEM extension  explained plainly with real examples.",
  },
  {
    id: 5,
    type: "Seminar",
    typeColor: "slate",
    title: "Scholarship Hunt: Finding Aid as a Bangladeshi Student",
    date: "26 April 2025",
    time: "3:00 PM BST",
    mode: "In-Person",
    location: "Doel Dhaka Office",
    audience: "All levels",
    description:
      "Fulbright, merit aid, RA/TA positions  mapped to real university deadlines for the 2026 intake cycle.",
  },
  {
    id: 6,
    type: "Workshop",
    typeColor: "amber",
    title: "GRE Zero to Target Score  A Study Plan That Works",
    date: "3 May 2025",
    time: "5:30 PM BST",
    mode: "Online",
    location: "Zoom",
    audience: "Pre-application students",
    description:
      "Build a realistic 8-week GRE plan. Includes resource list, score benchmarks by university tier, and mock test links.",
  },
];

const typeColorMap: Record<
  EventItem["typeColor"],
  { chip: string; dot: string }
> = {
  teal: { chip: "bg-primary/10 text-primary", dot: "bg-primary" },
  amber: { chip: "bg-secondary/15 text-amber-700", dot: "bg-secondary" },
  slate: { chip: "bg-slate-100 text-slate-600", dot: "bg-slate-400" },
};

function ModeIcon({ mode }: { mode: EventMode }) {
  if (mode === "Online") return <Monitor size={12} className="shrink-0" />;
  if (mode === "In-Person") return <MapPin size={12} className="shrink-0" />;
  return <span className="text-[10px] font-bold leading-none shrink-0">⊕</span>;
}

interface Props {
  filter: EventType;
}

export default function UpcomingEventsGrid({ filter }: Props) {
  const visible =
    filter === "All" ? events : events.filter((e) => e.type === filter);

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-14">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-8">
          <p className="text-secondary font-bold tracking-widest uppercase text-xs shrink-0">
            Upcoming Sessions
          </p>
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 shrink-0">
            {visible.length} session{visible.length !== 1 ? "s" : ""}
          </span>
        </div>

        {visible.length === 0 ? (
          <div className="py-16 text-center text-gray-500 text-sm">
            No upcoming sessions in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {visible.map((ev, idx) => {
              const colors = typeColorMap[ev.typeColor];
              return (
                <article
                  key={ev.id}
                  className="group flex flex-col bg-white rounded-lg border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  {/* Top accent bar  color-coded by type */}
                  <div
                    className={`h-1 w-full ${
                      ev.typeColor === "teal"
                        ? "bg-primary"
                        : ev.typeColor === "amber"
                          ? "bg-secondary"
                          : "bg-slate-300"
                    }`}
                  />

                  <div className="flex flex-col flex-1 p-5 md:p-6">
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${colors.chip}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${colors.dot}`}
                        />
                        {ev.type}
                      </span>
                      {/* Editorial number  faint, purely decorative */}
                      <span className="text-sm font-semibold text-gray-200 select-none">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-semibold font-inter text-gray-900 leading-snug mb-3 group-hover:text-primary transition-colors">
                      {ev.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
                      {ev.description}
                    </p>

                    {/* Meta */}
                    <div className="space-y-1.5 mb-4 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <CalendarDays
                          size={13}
                          className="text-primary shrink-0"
                        />
                        {ev.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock3 size={13} className="text-primary shrink-0" />
                        {ev.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <ModeIcon mode={ev.mode} />
                        <span>
                          {ev.mode} · {ev.location}
                        </span>
                      </div>
                    </div>

                    {/* Footer row */}
                    <div className="flex items-center justify-between gap-3 mt-auto">
                      <span className="text-xs font-semibold bg-gray-50 border border-gray-200 text-gray-500 px-2.5 py-1 rounded-full truncate max-w-[55%]">
                        {ev.audience}
                      </span>
                      <Link
                        href="/consultation#booking"
                        className="flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all shrink-0"
                      >
                        Register <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

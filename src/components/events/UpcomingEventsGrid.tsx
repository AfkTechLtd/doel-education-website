import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  Monitor,
} from "lucide-react";

type EventMode = "Online" | "In-Person" | "Hybrid";
type EventCategory = "Webinar" | "Visa Session" | "Seminar" | "Workshop";

export type EventFilter = "All" | "Past Events" | "Upcoming Events";

export interface EventItem {
  id: number;
  status: Exclude<EventFilter, "All">;
  type: EventCategory;
  typeColor: "teal" | "amber" | "slate";
  title: string;
  date: string;
  day: string;
  month: string;
  time: string;
  mode: EventMode;
  location: string;
  audience: string;
  description: string;
  highlight: string;
  detailLabel: string;
  detailValue: string;
  ctaLabel: string;
  ctaHref: string;
}

export const events: EventItem[] = [
  {
    id: 1,
    status: "Upcoming Events",
    type: "Visa Session",
    typeColor: "teal",
    title: "F-1 Student Visa: Common Mistakes and How to Avoid Them",
    date: "29 March 2025",
    day: "29",
    month: "Mar",
    time: "6:30 PM BST",
    mode: "Online",
    location: "Zoom",
    audience: "All applicants",
    description:
      "Visa mistakes, DS-160 issues, and stronger embassy answers explained simply.",
    highlight:
      "Walk away with a practical interview checklist, common red-flag answers to avoid, and examples of stronger responses.",
    detailLabel: "Seats left",
    detailValue: "42 seats left",
    ctaLabel: "Reserve seat",
    ctaHref: "/consultation#booking",
  },
  {
    id: 2,
    status: "Upcoming Events",
    type: "Seminar",
    typeColor: "slate",
    title: "Choosing Between MS and MBA - Which Path is Right for You?",
    date: "5 April 2025",
    day: "05",
    month: "Apr",
    time: "4:00 PM BST",
    mode: "In-Person",
    location: "Doel Dhaka Office",
    audience: "Undergrad & early career",
    description:
      "A practical comparison of MS and MBA paths, outcomes, and profile fit.",
    highlight:
      "We break down when an MBA makes sense, when an MS creates better leverage, and how to avoid choosing the wrong track.",
    detailLabel: "Seats left",
    detailValue: "18 seats left",
    ctaLabel: "Book my spot",
    ctaHref: "/consultation#booking",
  },
  {
    id: 3,
    status: "Upcoming Events",
    type: "Workshop",
    typeColor: "amber",
    title: "SOP Writing Clinic - Live Feedback on Your Draft",
    date: "12 April 2025",
    day: "12",
    month: "Apr",
    time: "5:00 PM BST",
    mode: "Hybrid",
    location: "Dhaka Office + Zoom",
    audience: "Active applicants",
    description:
      "Live SOP feedback with examples of what stronger drafts do better.",
    highlight:
      "Ideal if you already have a first draft and want sharper storytelling, stronger structure, and cleaner academic positioning.",
    detailLabel: "Review slots",
    detailValue: "25 review spots",
    ctaLabel: "Join workshop",
    ctaHref: "/consultation#booking",
  },
  {
    id: 4,
    status: "Upcoming Events",
    type: "Webinar",
    typeColor: "teal",
    title: "STEM OPT & Post-Graduation Work Rights in the USA",
    date: "19 April 2025",
    day: "19",
    month: "Apr",
    time: "7:00 PM BST",
    mode: "Online",
    location: "Zoom",
    audience: "Engineering & tech students",
    description:
      "A clear guide to CPT, OPT, and the STEM extension after graduation.",
    highlight:
      "Useful for students who want to understand how degree choice, internship timing, and work authorization connect after graduation.",
    detailLabel: "Expected turnout",
    detailValue: "120+ expected",
    ctaLabel: "Save my seat",
    ctaHref: "/consultation#booking",
  },
  {
    id: 5,
    status: "Upcoming Events",
    type: "Seminar",
    typeColor: "slate",
    title: "Scholarship Hunt: Finding Aid as a Bangladeshi Student",
    date: "26 April 2025",
    day: "26",
    month: "Apr",
    time: "3:00 PM BST",
    mode: "In-Person",
    location: "Doel Dhaka Office",
    audience: "All levels",
    description:
      "Funding options, merit aid, and assistantships for the 2026 intake.",
    highlight:
      "Perfect for students who need a funding-first shortlist instead of a broad list of universities with unclear affordability.",
    detailLabel: "Seats left",
    detailValue: "21 seats left",
    ctaLabel: "Reserve now",
    ctaHref: "/consultation#booking",
  },
  {
    id: 6,
    status: "Upcoming Events",
    type: "Workshop",
    typeColor: "amber",
    title: "GRE Zero to Target Score - A Study Plan That Works",
    date: "3 May 2025",
    day: "03",
    month: "May",
    time: "5:30 PM BST",
    mode: "Online",
    location: "Zoom",
    audience: "Pre-application students",
    description:
      "A usable eight-week GRE plan with resources and score targets.",
    highlight:
      "Includes a study rhythm that fits around university classes or full-time work so the plan feels usable, not idealized.",
    detailLabel: "Workbook access",
    detailValue: "Free workbook",
    ctaLabel: "Get access",
    ctaHref: "/consultation#booking",
  },
  {
    id: 7,
    status: "Past Events",
    type: "Webinar",
    typeColor: "teal",
    title: "Fall 2025 US Admissions Masterclass",
    date: "18 January 2025",
    day: "18",
    month: "Jan",
    time: "7:00 PM BST",
    mode: "Online",
    location: "Zoom",
    audience: "Undergrad & grad applicants",
    description:
      "Admissions planning with shortlist and timeline guidance for applicants.",
    highlight:
      "Students left with a personalized six-university shortlist framework and a clearer application sequence.",
    detailLabel: "Attendance",
    detailValue: "340 attendees",
    ctaLabel: "See event moments",
    ctaHref: "#event-gallery",
  },
  {
    id: 8,
    status: "Past Events",
    type: "Visa Session",
    typeColor: "teal",
    title: "Visa Interview Prep - Live Mock Session",
    date: "8 February 2025",
    day: "08",
    month: "Feb",
    time: "6:00 PM BST",
    mode: "Hybrid",
    location: "Dhaka Office + Zoom",
    audience: "Confirmed visa applicants",
    description:
      "Mock visa interview practice with fast feedback and real embassy-style questions.",
    highlight:
      "Ninety-two percent of participants reported feeling more confident before their embassy appointment.",
    detailLabel: "Attendance",
    detailValue: "215 attendees",
    ctaLabel: "View recap",
    ctaHref: "#event-gallery",
  },
  {
    id: 9,
    status: "Past Events",
    type: "Workshop",
    typeColor: "amber",
    title: "Scholarship Deep-Dive: Fulbright & Beyond",
    date: "1 March 2025",
    day: "01",
    month: "Mar",
    time: "5:30 PM BST",
    mode: "Online",
    location: "Zoom",
    audience: "Graduate applicants",
    description:
      "Scholarship strategy for graduate applicants looking for realistic funding routes.",
    highlight:
      "The session mapped 14 funding sources relevant to Bangladeshi graduate applicants.",
    detailLabel: "Attendance",
    detailValue: "180 attendees",
    ctaLabel: "Browse highlights",
    ctaHref: "#event-gallery",
  },
];

const typeColorMap: Record<
  EventItem["typeColor"],
  { chip: string; dot: string }
> = {
  teal: {
    chip: "border border-primary/10 bg-primary/10 text-primary",
    dot: "bg-primary",
  },
  amber: {
    chip: "border border-secondary/20 bg-secondary/15 text-amber-700",
    dot: "bg-secondary",
  },
  slate: {
    chip: "border border-slate-200 bg-slate-100 text-slate-600",
    dot: "bg-slate-400",
  },
};

const statusStyleMap: Record<
  EventItem["status"],
  {
    badge: string;
    support: string;
    button: string;
  }
> = {
  "Upcoming Events": {
    badge: "bg-primary text-white",
    support: "text-primary",
    button: "bg-primary text-white hover:bg-primary/90",
  },
  "Past Events": {
    badge: "bg-slate-900 text-white",
    support: "text-slate-500",
    button:
      "border border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50",
  },
};

function ModeIcon({ mode }: { mode: EventMode }) {
  if (mode === "Online") return <Monitor size={14} className="shrink-0 text-primary" />;
  if (mode === "In-Person") return <MapPin size={14} className="shrink-0 text-primary" />;

  return <Monitor size={14} className="shrink-0 text-primary" />;
}

interface Props {
  filter: EventFilter;
}

export default function UpcomingEventsGrid({ filter }: Props) {
  const visible =
    filter === "All" ? events : events.filter((event) => event.status === filter);

  return (
    <section className="py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-14">
        <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-4">
              <p className="shrink-0 text-xs font-bold uppercase tracking-widest text-secondary">
                Event Calendar
              </p>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
            <h2 className="font-poppins text-2xl font-semibold leading-tight text-primary md:text-3xl">
              Join what&apos;s next or revisit the sessions students found most useful.
            </h2>
          </div>

          <span className="inline-flex w-fit items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-500 shadow-sm">
            {visible.length} session{visible.length !== 1 ? "s" : ""} showing
          </span>
        </div>

        {visible.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-slate-200 bg-slate-50 px-6 py-16 text-center text-sm text-slate-500">
            No sessions are available in this view right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:gap-6">
            {visible.map((event) => {
              const colors = typeColorMap[event.typeColor];
              const statusStyles = statusStyleMap[event.status];

              return (
                <article
                  key={event.id}
                  className="group flex h-full flex-col rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-6"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${statusStyles.badge}`}
                    >
                      {event.status === "Upcoming Events" ? "Upcoming" : "Past"}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${colors.chip}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
                      {event.type}
                    </span>
                  </div>

                  <h3 className="mt-4 max-w-xl font-inter text-lg font-semibold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-primary sm:text-xl">
                    {event.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays size={14} className="shrink-0 text-primary" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock3 size={14} className="shrink-0 text-primary" />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ModeIcon mode={event.mode} />
                      {event.mode}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    {event.description}
                  </p>

                  <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className={`text-sm font-semibold ${statusStyles.support}`}>
                      {event.detailValue}
                    </p>

                    <Link
                      href={event.ctaHref}
                      className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${statusStyles.button}`}
                    >
                      {event.status === "Upcoming Events" ? "Register" : "View photos"}
                      <ArrowRight size={14} />
                    </Link>
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

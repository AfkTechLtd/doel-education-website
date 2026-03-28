import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, Users, Wifi } from "lucide-react";

const featured = {
  type: "Webinar",
  title: "US Graduate Admissions 2026  Everything You Need to Know",
  date: "Saturday, 22 March 2025",
  time: "7:00 PM – 9:00 PM BST",
  mode: "Online (Zoom)",
  seats: "112 seats remaining",
  seatsLow: false,
  capacityPct: 38,
  description:
    "A two-hour deep-dive covering Fall 2026 deadlines, GRE waiver policies, scholarship opportunities, and live Q&A with our senior counselors. Aimed at undergrad final-year students and recent graduates.",
  topics: [
    "Fall 2026 application calendar",
    "GRE / IELTS requirements by university tier",
    "Scholarship and RA/TA strategy",
    "Live counselor Q&A",
  ],
};

export default function FeaturedEvent() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-14 py-10 md:py-12">
      {/* Section label  matches site pattern */}
      <div className="flex items-center gap-4 mb-6">
        <p className="text-secondary font-bold tracking-widest uppercase text-sm shrink-0">
          Next Up
        </p>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Card  site card pattern: border border-gray-200 shadow-lg rounded-lg */}
      <div className="relative overflow-hidden rounded-lg border border-gray-200 shadow-lg bg-white">
        {/* Left accent strip on desktop */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-1 bg-primary" />
        {/* Top accent bar on mobile */}
        <div className="md:hidden h-1 w-full bg-primary" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px]">
          {/* ── Main content ── */}
          <div className="p-5 sm:p-8 md:p-10 md:pl-12">
            {/* Type badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest bg-primary text-white px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block" />
                {featured.type}
              </span>
              <span className="text-sm text-gray-500">Featured Event</span>
            </div>

            {/* Title  site heading scale */}
            <h2 className="text-2xl md:text-3xl font-semibold font-inter text-slate-900 leading-snug max-w-2xl mb-4">
              {featured.title}
            </h2>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-5 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <CalendarDays size={14} className="text-primary shrink-0" />
                {featured.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock3 size={14} className="text-primary shrink-0" />
                {featured.time}
              </span>
              <span className="flex items-center gap-1.5">
                <Wifi size={14} className="text-primary shrink-0" />
                {featured.mode}
              </span>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed max-w-xl mb-5">
              {featured.description}
            </p>

            {/* Topic tags */}
            <div className="flex flex-wrap gap-2">
              {featured.topics.map((t) => (
                <span
                  key={t}
                  className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-3 py-1 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Mobile register strip */}
            <div className="lg:hidden mt-6 pt-5 border-t border-gray-100 flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <Users size={13} className="text-primary shrink-0" />
                  <span className="text-sm font-semibold text-gray-900">
                    {featured.seats}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${featured.capacityPct}%` }}
                  />
                </div>
              </div>
              <Link
                href="/consultation#booking"
                className="shrink-0 flex items-center gap-1.5 bg-primary text-white font-semibold text-sm px-4 py-2.5 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Reserve Seat <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* ── Right panel (desktop only) ── */}
          <div className="hidden lg:flex flex-col justify-between bg-[linear-gradient(180deg,#ffffff_0%,#FFF6E0_100%)] border-l border-gray-200 p-8 md:p-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                Availability
              </p>
              <div className="flex items-center gap-2 mb-2">
                <Users size={15} className="text-primary shrink-0" />
                <span
                  className={`text-sm font-semibold ${featured.seatsLow ? "text-red-500" : "text-gray-900"}`}
                >
                  {featured.seats}
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${featured.capacityPct}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {featured.capacityPct}% capacity filled
              </p>
            </div>

            <div className="my-6 h-px bg-gray-200" />

            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Registration
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Seats are limited. Book a consultation slot to confirm your
                place in this session.
              </p>
              <Link
                href="/consultation#booking"
                className="flex items-center justify-center gap-2 w-full bg-primary text-white font-semibold text-sm py-3.5 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Reserve My Seat <ArrowRight size={14} />
              </Link>
              <p className="text-xs text-center text-gray-400">
                Free · No payment required
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

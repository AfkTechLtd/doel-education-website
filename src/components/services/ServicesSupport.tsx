import { BadgeCheck, CheckCircle2, FileCheck2 } from "lucide-react";
import ScrollRevealSection from "@/components/common/ScrollRevealSection";

const preVisaSupport = [
  "Free Profile Assessment",
  "University Selection",
  "Application & SOP Preparation",
  "I-20 Guarantee",
  "Visa File Preparation",
  "Mock Visa Interview",
];

const postVisaSupport = [
  "Cheapest Air Ticket",
  "Airport Pickup & Arrival Guidance",
  "Housing Facility",
  "Global SIM Card",
  "Health Insurance",
  "Bank Account Support",
  "International Payment Services",
  "Part-Time Job & Internship Placement",
  "Job Within 6 Months",
  "Departure Gift Hamper",
];

export default function ServicesSupport() {
  return (
    <div className="mx-auto max-w-7xl 2xl:px-6 px-6 md:px-20 pb-20 pt-6 md:pb-24 md:pt-10">
      <ScrollRevealSection>
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          <article className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm md:p-9">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 font-inter text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <FileCheck2 size={14} />
              Pre-Visa Support
            </div>

            <h2 className="font-poppins text-2xl font-bold text-slate-900 md:text-3xl">
              Everything you need to get there, done right the first time.
            </h2>
            <p className="mt-4 font-inter text-sm leading-relaxed text-slate-600 md:text-base">
              Choosing the wrong university or submitting one wrong document can
              cost you months and thousands of taka. We make sure that never
              happens.
            </p>

            <ul className="mt-8 grid gap-3">
              {preVisaSupport.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-3"
                >
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-primary"
                    size={18}
                  />
                  <span className="font-inter text-sm font-medium text-slate-700 md:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm md:p-9">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-2 font-inter text-xs font-semibold uppercase tracking-[0.18em] text-slate-800">
              <BadgeCheck size={14} />
              Post-Visa Support
            </div>

            <h2 className="font-poppins text-2xl font-bold text-slate-900 md:text-3xl">
              Getting the visa is one moment. Building a life is everything
              after.
            </h2>
            <p className="mt-4 font-inter text-sm leading-relaxed text-slate-600 md:text-base">
              This is where most agencies disappear. This is where we show up.
            </p>

            <ul className="mt-8 grid gap-3">
              {postVisaSupport.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-3"
                >
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-secondary"
                    size={18}
                  />
                  <span className="font-inter text-sm font-medium text-slate-700 md:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </ScrollRevealSection>
    </div>
  );
}
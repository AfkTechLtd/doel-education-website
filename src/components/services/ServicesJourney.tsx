import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Home,
  Plane,
  ShieldCheck,
  Smartphone,
  UserRoundCheck,
} from "lucide-react";
import ScrollRevealSection from "@/components/common/ScrollRevealSection";

export default function ServicesJourney() {
  return (
    <div className="mx-auto max-w-7xl 2xl:px-6 px-6 md:px-20 pb-20 md:pb-24">
      <ScrollRevealSection>
        <section className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm md:p-10">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { label: "Profile", icon: UserRoundCheck },
              { label: "Visa", icon: ShieldCheck },
              { label: "Flights", icon: Plane },
              { label: "Housing", icon: Home },
              { label: "SIM", icon: Smartphone },
              { label: "Career", icon: Briefcase },
            ].map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-4"
              >
                <Icon size={18} className="text-primary" />
                <span className="font-inter text-sm font-semibold text-slate-700">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-5 border-t border-slate-100 pt-8 md:flex-row md:items-center">
            <p className="max-w-2xl font-inter text-sm leading-relaxed text-slate-600 md:text-base">
              From your first profile review to your first paycheck abroad, our
              team supports the full journey, not just one checkpoint.
            </p>
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-inter text-sm font-semibold text-white transition-colors hover:bg-primary/90"
            >
              Start Your Journey
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </ScrollRevealSection>
    </div>
  );
}
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

const packages = [
  {
    name: "Basic",
    price: "BDT 12,000",
    subtitle: "A strong, honest start",
    features: [
      "Profile evaluation",
      "University shortlist (up to 6)",
      "One SOP review",
      "Basic visa document checklist",
    ],
    featured: false,
    cta: "Get Started",
  },
  {
    name: "Standard",
    price: "BDT 25,000",
    subtitle: "Complete application cycle",
    featured: true,
    features: [
      "Everything in Basic",
      "Applications for up to 10 universities",
      "Unlimited SOP, LOR, CV editing",
      "Scholarship identification",
      "Mock visa interview session",
    ],
    cta: "Most Popular",
  },
  {
    name: "Premium",
    price: "BDT 45,000",
    subtitle: "From admit to first day on campus",
    features: [
      "Everything in Standard",
      "Priority counselor access",
      "3 mock interview sessions",
      "Pre-departure planning call",
      "Post-arrival starter guide",
    ],
    featured: false,
    cta: "Full Support",
  },
];

export default function ServicePackages() {
  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-10 md:px-14">
        <div className="text-center mb-14">
          <h5 className="text-secondary font-bold tracking-widest uppercase text-sm mb-3">
            Service Packages
          </h5>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5">
            Pick the depth of support you need
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Every package includes honest profile feedback. Final pricing may
            vary by intake complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`rounded-2xl p-8 flex flex-col border transition-shadow duration-300 ${
                pkg.featured
                  ? "border-primary shadow-xl bg-white"
                  : "border-gray-100 shadow-sm hover:shadow-md bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-2xl font-bold text-slate-900">
                  {pkg.name}
                </h3>
                {pkg.featured && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary shrink-0">
                    <Sparkles size={11} /> Most Chosen
                  </span>
                )}
              </div>
              <p className="text-3xl font-bold text-primary mb-1">
                {pkg.price}
              </p>
              <p className="text-sm text-gray-500 mb-6">{pkg.subtitle}</p>

              <ul className="space-y-3 mb-8 flex-1">
                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-gray-600"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-secondary shrink-0 mt-0.5"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/consultation#booking"
                className={`w-full text-center rounded-xl py-3.5 font-semibold text-sm transition-colors duration-200 ${
                  pkg.featured
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "border border-primary text-primary hover:bg-primary/5"
                }`}
              >
                {pkg.cta} <ArrowRight size={14} className="inline ml-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

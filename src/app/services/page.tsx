import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  BookText,
  FileCheck,
  GraduationCap,
  Landmark,
  Plane,
  Search,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";

export const metadata = {
  title: "Services — Doel Education",
  description:
    "Profile evaluation, university shortlisting, application support, visa prep, scholarship strategy, and pre-departure guidance for Bangladeshi students.",
};

const admissionFlow = [
  {
    icon: Search,
    title: "Profile Evaluation",
    points: [
      "GPA, test score, gap year, and budget fit review",
      "Clear, honest target range before you apply",
    ],
  },
  {
    icon: GraduationCap,
    title: "University Selection",
    points: [
      "Reach, match, safety strategy for your profile",
      "Final shortlist by major, budget, and scholarship chance",
    ],
  },
  {
    icon: FileCheck,
    title: "Application Support",
    points: [
      "SOP, LOR, resume, and essay editing support",
      "Deadline planning and document quality check",
    ],
  },
];

const prepAndFunding = [
  {
    icon: BookOpen,
    title: "Test Prep Guidance",
    description:
      "GRE, GMAT, IELTS, and TOEFL planning with curated resources and verified coaching links based on your target intake.",
  },
  {
    icon: Wallet,
    title: "Scholarship Hunt",
    description:
      "Merit and need-based aid opportunities for Bangladeshi students, with application timing and profile positioning guidance.",
  },
];

const visaAndDeparture = [
  {
    icon: BookText,
    title: "DS-160 + I-20 + SEVIS",
    description:
      "Step-by-step walkthrough so each visa document is completed correctly the first time.",
  },
  {
    icon: ShieldCheck,
    title: "Mock Interview Prep",
    description:
      "Question bank, confidence drills, and final review before your embassy date.",
  },
  {
    icon: Plane,
    title: "Pre-Departure Support",
    description:
      "Housing, banking, packing checklist, and arrival orientation for a smooth start.",
  },
];

const packages = [
  {
    name: "Basic",
    price: "BDT 12,000",
    subtitle: "For students who need a strong start",
    features: [
      "Profile evaluation",
      "University shortlist (up to 6)",
      "One SOP review",
      "Basic visa checklist",
    ],
  },
  {
    name: "Standard",
    price: "BDT 25,000",
    subtitle: "Most popular for complete application support",
    featured: true,
    features: [
      "Everything in Basic",
      "Application support for up to 10 universities",
      "SOP, LOR, CV editing rounds",
      "Scholarship guidance",
      "Mock visa interview",
    ],
  },
  {
    name: "Premium",
    price: "BDT 45,000",
    subtitle: "For full-cycle support to departure",
    features: [
      "Everything in Standard",
      "Priority counselor access",
      "Multiple mock interviews",
      "Pre-departure planning session",
      "Post-arrival starter guidance",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-white">
      <section className="max-w-7xl mx-auto px-10 py-16 md:py-20">
        <p className="text-secondary tracking-widest text-sm font-semibold uppercase">
          Services
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl font-semibold font-inter text-gray-900 max-w-3xl leading-tight">
          From profile fit to visa approval, every step is planned before you
          spend on applications.
        </h1>
        <p className="mt-5 text-gray-600 text-lg max-w-2xl">
          We do not push random universities. We build a realistic strategy
          based on your academic record, budget, and long-term goals.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/consultation#booking"
            className="inline-flex items-center gap-2 bg-primary text-white font-inter font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Book Consultation <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/study-in-us"
            className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 font-inter font-semibold px-6 py-3 rounded-lg hover:border-primary hover:text-primary transition-colors"
          >
            Explore Study in US
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-10 pb-16 md:pb-20">
        <div className="mb-8">
          <p className="text-secondary tracking-widest text-sm font-semibold uppercase">
            Admissions Strategy
          </p>
          <h2 className="mt-3 text-3xl font-semibold font-inter text-gray-900">
            Three core services that decide your admit quality
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {admissionFlow.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="p-6 rounded-lg border border-gray-200 shadow-lg"
              >
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-inter font-semibold text-xl text-gray-900">
                  {item.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-2 text-sm text-gray-600">
                      <BadgeCheck className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-10 py-16 md:py-20">
          <div className="mb-8">
            <p className="text-secondary tracking-widest text-sm font-semibold uppercase">
              Test + Funding
            </p>
            <h2 className="mt-3 text-3xl font-semibold font-inter text-gray-900">
              Better scores and better funding options
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {prepAndFunding.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg"
                >
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-inter font-semibold text-xl text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-10 py-16 md:py-20">
        <div className="mb-8">
          <p className="text-secondary tracking-widest text-sm font-semibold uppercase">
            Visa + Pre-Departure
          </p>
          <h2 className="mt-3 text-3xl font-semibold font-inter text-gray-900">
            Clear process from embassy prep to first week in the USA
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {visaAndDeparture.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="p-6 rounded-lg border border-gray-200 shadow-lg"
              >
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-inter font-semibold text-xl text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-10 py-16 md:py-20">
          <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div>
              <p className="text-secondary tracking-widest text-sm font-semibold uppercase">
                Service Packages
              </p>
              <h2 className="mt-3 text-3xl font-semibold font-inter text-gray-900">
                Choose support depth based on your timeline
              </h2>
            </div>
            <p className="text-sm text-gray-500 max-w-sm">
              Final pricing may vary by intake complexity and number of
              universities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {packages.map((pkg) => (
              <article
                key={pkg.name}
                className={`rounded-lg border p-6 ${
                  pkg.featured
                    ? "border-primary shadow-lg bg-white"
                    : "border-gray-200 shadow-lg bg-white"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-inter font-semibold text-xl text-gray-900">
                    {pkg.name}
                  </h3>
                  {pkg.featured && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                      <Sparkles className="w-3 h-3" /> Most Chosen
                    </span>
                  )}
                </div>

                <p className="mt-2 text-2xl font-semibold text-gray-900">{pkg.price}</p>
                <p className="mt-1 text-sm text-gray-500">{pkg.subtitle}</p>

                <ul className="mt-5 space-y-2.5">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                      <Landmark className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

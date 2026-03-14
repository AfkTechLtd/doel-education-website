"use client";

import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  Briefcase,
  DollarSign,
  Globe,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const reasons = [
  {
    icon: GraduationCap,
    title: "World-Class Universities",
    description:
      "Study at MIT, UT Austin, Purdue, and 200+ partner institutions. A US degree carries weight in Dhaka, Dubai, and everywhere in between.",
  },
  {
    icon: Briefcase,
    title: "OPT & STEM Work Rights",
    description:
      "Work in the US for up to 3 years post-graduation with the STEM OPT extension. Build your career before you return — or stay longer.",
  },
  {
    icon: DollarSign,
    title: "Scholarships & Funding",
    description:
      "Fulbright, merit aid, RA/TA positions — we help you find funding that can cover 50–100% of tuition. Most students are surprised by what's available.",
  },
  {
    icon: Globe,
    title: "Global Recognition",
    description:
      "A US degree opens doors with Fortune 500 companies, international NGOs, and top employers across South Asia and the Gulf.",
  },
];

const universities = [
  {
    image: "/study/uni-ut-austin.png",
    tier: "Research University",
    name: "University of Texas, Austin",
    location: "Austin, TX",
    fields: ["CS", "Engineering", "Business"],
    funding: "Merit Aid Available",
  },
  {
    image: "/study/uni-indiana.png",
    tier: "Business Powerhouse",
    name: "Indiana University, Bloomington",
    location: "Bloomington, IN",
    fields: ["MBA", "Finance", "Info Systems"],
    funding: "60% Merit Scholarships",
  },
  {
    image: "/study/uni-unt.png",
    tier: "Affordable Excellence",
    name: "University of North Texas",
    location: "Denton, TX",
    fields: ["Data Science", "Public Health", "MBA"],
    funding: "RA/TA Available",
  },
];

const testimonials = [
  {
    initials: "RH",
    name: "Rafiul Hasan",
    program: "MS Computer Science · UT Dallas",
    quote:
      "EduBridge handled everything — my SOP, visa prep, even accommodation. I landed at JFK with zero stress.",
    scholarship: "Partial TA scholarship",
    color: "#2B5F4A",
  },
  {
    initials: "NK",
    name: "Nusrat Karim",
    program: "MBA Finance · Indiana University",
    quote:
      "I got a 60% merit scholarship at Indiana. My consultant knew exactly which universities to target for my profile.",
    scholarship: "60% merit scholarship",
    color: "#8B2635",
  },
  {
    initials: "AS",
    name: "Arif Shahriar",
    program: "MS Data Science · UNT",
    quote:
      "The visa mock interviews saved me. After three sessions with my advisor I walked into the embassy completely calm.",
    scholarship: "Graduate assistantship",
    color: "#1A3A6B",
  },
];

const faqs = [
  {
    q: "What IELTS/TOEFL score do I need?",
    a: "Most universities require IELTS 6.5+ or TOEFL 80+. Top research universities may ask for IELTS 7.0+. Some waive the requirement if your medium of instruction was English.",
  },
  {
    q: "Can I work while studying?",
    a: "F-1 students can work up to 20 hours/week on-campus during the semester and full-time during breaks. Off-campus work (CPT/OPT) is available after your first academic year.",
  },
  {
    q: "What GPA do I need for US graduate programs?",
    a: "Most programs accept 3.0/4.0 or equivalent. With strong GRE scores or work experience, students with a 2.8 CGPA have been admitted. We assess your full profile holistically.",
  },
  {
    q: "What happens after I graduate?",
    a: "You get 12 months of OPT to work in the US. STEM graduates get an additional 24-month extension — 3 years total of US work experience before needing employer sponsorship.",
  },
];

// ─── FAQ Item ──────────────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left font-inter font-medium text-gray-800 hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm">{q}</span>
        <ChevronDown
          size={16}
          className={`text-primary flex-shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 font-inter text-sm text-gray-500 leading-relaxed border-t border-gray-100">
          {a}
        </div>
      )}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function StudyInUSAPage() {
  return (
    <main className="bg-white overflow-x-hidden">

      {/* ── 1. HERO ────────────────────────────────────────────────────────── */}
    <section className="relative min-h-[88vh] flex items-center overflow-hidden">

  {/* Background */}
  <div className="absolute inset-0">
    <Image
      src="/study/hero-campus.png"
      alt="American university campus"
      fill
      priority
      className="object-cover"
    />

    {/* subtle overlay */}
    <div className="absolute inset-0 bg-primary/60"></div>
  </div>

  {/* Content */}
  <div className="relative max-w-6xl mx-auto px-6 py-24 text-white">

    <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-3xl">
      Study in the United States
      <span className="text-secondary"> with Expert Guidance</span>
    </h1>

    <p className="mt-6 text-lg max-w-xl text-white/90">
      Find the right universities, scholarships, and career opportunities
      with guidance from experienced counselors.
    </p>

    <div className="mt-8 flex gap-4">
      <button className="bg-secondary cursor-pointer hover:opacity-90 transition-all text-primary font-semibold px-6 py-3 rounded-md">
        Start Application
      </button>

      <button className="border hover:bg-white hover:text-black transition-all cursor-pointer border-white/40 px-6 py-3 rounded-md">
        Explore Universities
      </button>
    </div>

  </div>

</section>

      {/* ── 2. WHY USA ─────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-14">
            <p className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
              Why Choose the USA
            </p>
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Why thousands of Bangladeshi students choose the USA every year.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {reasons.map((r) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.title}
                  className="p-6 rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-poppins font-semibold text-gray-900 text-base mb-3">
                    {r.title}
                  </h3>
                  <p className="font-inter text-gray-500 text-sm leading-relaxed">
                    {r.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. UNIVERSITIES ────────────────────────────────────────────────── */}
      <section id="universities" className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="max-w-xl">
              <p className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-white mb-3">
                Our University Network
              </p>
              <h2 className="font-poppins text-3xl md:text-4xl font-bold text-white leading-tight">
                200+ partner universities. Every budget. Every goal.
              </h2>
            </div>
            <Link
              href="#consultation"
              className="font-inter text-sm font-semibold text-primary flex items-center gap-2 hover:gap-3 transition-all flex-shrink-0"
            >
              See all universities <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {universities.map((u) => (
              <div
                key={u.name}
                className="rounded-2xl bg-white border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-100/80 transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={u.image}
                    alt={u.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                  <span className="absolute top-3 left-3 font-inter text-[10px] font-bold uppercase tracking-widest bg-primary text-white px-3 py-1 rounded-full">
                    {u.tier}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-poppins font-bold text-gray-900 text-base mb-1">
                    {u.name}
                  </h3>
                  <p className="font-inter text-xs text-gray-400 mb-4">{u.location}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {u.fields.map((f) => (
                      <span
                        key={f}
                        className="font-inter text-[11px] bg-gray-100 text-gray-600 px-2 py-1 rounded-md"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <span className="font-inter text-xs font-semibold text-primary bg-primary/8 px-3 py-1 rounded-full">
                      {u.funding}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. TESTIMONIALS + FAQ ──────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          {/* Testimonials */}
          <div className="max-w-xl mb-14">
            <p className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
              Student Stories
            </p>
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Bangladeshis thriving in the USA.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-24">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-6 rounded-2xl border border-gray-100 hover:shadow-lg hover:shadow-gray-100 transition-all"
              >
                <div className="font-poppins text-4xl text-primary font-bold leading-none mb-4">
                  &ldquo;
                </div>
                <p className="font-inter text-gray-600 text-sm leading-relaxed italic mb-6">
                  {t.quote}
                </p>
                <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-poppins font-bold text-white text-xs flex-shrink-0"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="font-poppins font-semibold text-gray-800 text-sm">
                      {t.name}
                    </div>
                    <div className="font-inter text-xs text-gray-400 truncate">{t.program}</div>
                    <div className="font-inter text-[11px] text-primary font-semibold mt-0.5">
                      {t.scholarship}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
                Common Questions
              </p>
              <h2 className="font-poppins text-3xl font-bold text-gray-900 leading-tight mb-4">
                Everything students ask us.
              </h2>
              <p className="font-inter text-gray-500 text-sm leading-relaxed mb-8">
                Still have questions? Book a free consultation and get personalised answers for
                your specific profile and goals.
              </p>
              <Link
                href="#consultation"
                className="inline-flex items-center gap-2 bg-primary text-white font-inter font-semibold text-sm px-7 py-3.5 rounded-xl hover:bg-primary/90 transition-colors"
              >
                Book Free Call <ArrowRight size={15} />
              </Link>
            </div>

            <div className="space-y-3">
              {faqs.map((f) => (
                <FAQItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section id="consultation" className="relative py-28 bg-primary overflow-hidden">

  {/* Background */}
  <div className="absolute inset-0">
    <Image
      src="/study/cta-bg.png"
      alt="University campus aerial"
      fill
      className="object-cover opacity-15"
    />
  </div>

  <div className="relative max-w-3xl mx-auto px-6 text-center">

    <p className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-5">
      Start Your Journey
    </p>

    <h2 className="font-poppins text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
      Ready to study in the <span className="text-secondary">USA?</span>
    </h2>

    <p className="font-inter text-white/70 text-base leading-relaxed mb-12 max-w-xl mx-auto">
      Book a free 45-minute consultation with a specialist. No sales pitch — just honest
      advice about your options.
    </p>

    {/* Form Card */}
    <div className="bg-white rounded-2xl p-8 shadow-xl max-w-xl mx-auto">

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Your full name"
          className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
        />

        <input
          type="tel"
          placeholder="WhatsApp number"
          className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
        />
      </div>

      <button className="w-full bg-primary text-white font-semibold py-4 rounded-lg hover:bg-primary/90 transition-colors">
        Book My Free Consultation
      </button>

      <p className="text-xs text-gray-500 text-center mt-3">
        No spam. Response within 2 hours during business hours.
      </p>

    </div>
  </div>
</section>

    </main>
  );
}
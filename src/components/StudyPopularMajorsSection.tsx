"use client";

import { useState } from "react";
import {
  Code2,
  BarChart3,
  Briefcase,
  FlaskConical,
  Cpu,
  HeartPulse,
  ArrowRight,
  TrendingUp,
  Users,
  DollarSign,
} from "lucide-react";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

type Difficulty = "Accessible" | "Moderate" | "Competitive";

interface Major {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  category: string;
  label: string;
  majors: string[];
  difficulty: Difficulty;
  difficultyColor: string;
  admitRate: string;
  fundingRate: string;
  optEligible: boolean;
  optMonths: number;
  avgStartingSalary: string;
  bangladeshiShare: string;
  conversionRate: number; // % of applicants we successfully place
  topUniversities: string[];
  insight: string;
}

const MAJORS: Major[] = [
  {
    icon: Code2,
    category: "STEM",
    label: "Computer Science & IT",
    majors: [
      "MS Computer Science",
      "MS Software Engineering",
      "MS Data Science",
      "MS Cybersecurity",
    ],
    difficulty: "Competitive",
    difficultyColor: "text-rose-600 bg-rose-50",
    admitRate: "18–35%",
    fundingRate: "55%",
    optEligible: true,
    optMonths: 36,
    avgStartingSalary: "$95,000",
    bangladeshiShare: "38%",
    conversionRate: 82,
    topUniversities: ["UT Dallas", "Purdue", "Arizona State", "UMass Amherst"],
    insight:
      "Highest OPT demand. Amazon, Google & Microsoft are top STEM OPT employers. Strong RA/TA funding available.",
  },
  {
    icon: Cpu,
    category: "STEM",
    label: "Engineering",
    majors: [
      "MS Electrical Engineering",
      "MS Mechanical Engineering",
      "MS Civil Engineering",
      "MS Industrial Eng.",
    ],
    difficulty: "Moderate",
    difficultyColor: "text-amber-600 bg-amber-50",
    admitRate: "22–40%",
    fundingRate: "60%",
    optEligible: true,
    optMonths: 36,
    avgStartingSalary: "$88,000",
    bangladeshiShare: "22%",
    conversionRate: 78,
    topUniversities: ["Texas A&M", "UNT", "UTA", "Indiana University"],
    insight:
      "International students earn 60% of all engineering doctorates in the US. Strong TA funding pipeline.",
  },
  {
    icon: BarChart3,
    category: "STEM-MBA",
    label: "Business Analytics & Finance",
    majors: [
      "MS Business Analytics",
      "MBA Finance",
      "MS Management Information Systems",
      "MS Accounting",
    ],
    difficulty: "Moderate",
    difficultyColor: "text-amber-600 bg-amber-50",
    admitRate: "30–50%",
    fundingRate: "40%",
    optEligible: true,
    optMonths: 36,
    avgStartingSalary: "$78,000",
    bangladeshiShare: "18%",
    conversionRate: 86,
    topUniversities: [
      "Indiana University",
      "UT Dallas",
      "Baruch College",
      "University of Illinois",
    ],
    insight:
      "Business Analytics enrollment surged 48% in 2024. STEM-designated MBAs now qualify for 36-month OPT.",
  },
  {
    icon: Briefcase,
    category: "Business",
    label: "MBA & Management",
    majors: [
      "MBA General",
      "MBA Marketing",
      "MBA Supply Chain",
      "MS Human Resource Management",
    ],
    difficulty: "Accessible",
    difficultyColor: "text-emerald-600 bg-emerald-50",
    admitRate: "45–65%",
    fundingRate: "25%",
    optEligible: false,
    optMonths: 12,
    avgStartingSalary: "$72,000",
    bangladeshiShare: "12%",
    conversionRate: 91,
    topUniversities: [
      "Indiana University",
      "UNT",
      "University of Memphis",
      "Western Illinois",
    ],
    insight:
      "Highest admission rates. Merit scholarships of 40–60% commonly available at mid-tier programs.",
  },
  {
    icon: FlaskConical,
    category: "STEM",
    label: "Data Science & Statistics",
    majors: [
      "MS Data Science",
      "MS Statistics",
      "MS Applied Mathematics",
      "MS Bioinformatics",
    ],
    difficulty: "Competitive",
    difficultyColor: "text-rose-600 bg-rose-50",
    admitRate: "20–38%",
    fundingRate: "50%",
    optEligible: true,
    optMonths: 36,
    avgStartingSalary: "$92,000",
    bangladeshiShare: "14%",
    conversionRate: 79,
    topUniversities: ["UT Austin", "Purdue", "UMass", "UC Davis"],
    insight:
      "Fastest growing field. Fintech, e-commerce and AI companies actively recruiting Bangladeshi graduates.",
  },
  {
    icon: HeartPulse,
    category: "Healthcare",
    label: "Public Health & Nursing",
    majors: [
      "MPH Public Health",
      "MS Healthcare Administration",
      "MS Epidemiology",
      "MS Biomedical Sciences",
    ],
    difficulty: "Accessible",
    difficultyColor: "text-emerald-600 bg-emerald-50",
    admitRate: "40–60%",
    fundingRate: "30%",
    optEligible: true,
    optMonths: 36,
    avgStartingSalary: "$65,000",
    bangladeshiShare: "6%",
    conversionRate: 88,
    topUniversities: [
      "University of South Florida",
      "UNT Health",
      "George Mason",
      "UMass Lowell",
    ],
    insight:
      "Growing fast among Bangladeshi students. Good scholarship availability and strong post-grad employment.",
  },
];

const DIFFICULTY_ORDER: Difficulty[] = [
  "Accessible",
  "Moderate",
  "Competitive",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ConversionBar({ value }: { value: number }) {
  return (
    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
      <div
        className="h-full rounded-full bg-primary transition-all duration-700"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function MajorCard({
  major,
  active,
  onClick,
}: {
  major: Major;
  active: boolean;
  onClick: () => void;
}) {
  const Icon = major.icon;
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200
        ${
          active
            ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
            : "border-slate-100 bg-white hover:border-primary/20 hover:shadow-sm text-slate-700"
        }
      `}
    >
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${active ? "bg-white/15" : "bg-primary/8"}`}
      >
        <Icon size={18} className={active ? "text-white" : "text-primary"} />
      </div>
      <div className="min-w-0 flex-1">
        <p
          className={`text-sm font-semibold font-poppins leading-tight ${active ? "text-white" : "text-slate-800"}`}
        >
          {major.label}
        </p>
        <p
          className={`text-xs mt-0.5 font-inter ${active ? "text-white/60" : "text-slate-400"}`}
        >
          {major.category} · {major.admitRate} admit rate
        </p>
      </div>
      <div
        className={`flex-shrink-0 text-xs font-semibold font-inter px-2 py-1 rounded-lg ${active ? "bg-white/15 text-white" : major.difficultyColor}`}
      >
        {major.difficulty}
      </div>
    </button>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function PopularMajors() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = MAJORS[activeIndex];
  const Icon = active.icon;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <p className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
              Popular Majors
            </p>
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              Choose your field.
              <br />
              <span className="text-primary">We will find the path in.</span>
            </h2>
            <p className="font-inter text-slate-500 text-sm leading-relaxed mt-4 max-w-lg">
              Based on 2024 Open Doors data and our placement history with
              Bangladeshi students. Admission rates, funding availability, and
              OPT eligibility all in one view.
            </p>
          </div>

          {/* Top-level stat pills */}
          <div className="flex flex-wrap gap-3">
            {[
              { icon: TrendingUp, label: "57% of intl. students in STEM" },
              { icon: Users, label: "17,099 Bangladeshis in US (2024)" },
              { icon: DollarSign, label: "Avg. $78K starting salary" },
            ].map(({ icon: I, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-full border border-slate-100 bg-slate-50 px-3 py-1.5"
              >
                <I size={12} className="text-primary flex-shrink-0" />
                <span className="font-inter text-xs text-slate-600">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Two-panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-start">
          {/* LEFT: Major list */}
          <div className="flex flex-col gap-2.5">
            {MAJORS.map((m, i) => (
              <MajorCard
                key={m.label}
                major={m}
                active={i === activeIndex}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>

          {/* RIGHT: Detail panel */}
          <div className="rounded-3xl border border-slate-100 bg-white shadow-sm overflow-hidden">
            {/* Panel header */}
            <div className="bg-primary px-8 py-7 flex items-start gap-5">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center">
                <Icon size={26} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-xs font-semibold font-inter px-2 py-0.5 rounded-md bg-white/15 text-white`}
                  >
                    {active.category}
                  </span>
                  <span
                    className={`text-xs font-semibold font-inter px-2 py-0.5 rounded-md ${active.difficultyColor}`}
                  >
                    {active.difficulty}
                  </span>
                </div>
                <h3 className="font-poppins text-xl font-bold text-white leading-tight">
                  {active.label}
                </h3>
                <p className="font-inter text-white/60 text-xs mt-1">
                  {active.majors.slice(0, 3).join(" · ")}
                  {active.majors.length > 3 ? " · more" : ""}
                </p>
              </div>
            </div>

            {/* Key metrics grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y divide-slate-100 border-b border-slate-100">
              {[
                {
                  label: "Admit Rate",
                  value: active.admitRate,
                  sub: "at target schools",
                },
                {
                  label: "Funding Rate",
                  value: active.fundingRate,
                  sub: "receive some aid",
                },
                {
                  label: "OPT Duration",
                  value: `${active.optMonths} mo.`,
                  sub: active.optEligible ? "STEM eligible" : "Standard OPT",
                },
                {
                  label: "Avg. Salary",
                  value: active.avgStartingSalary,
                  sub: "first year in US",
                },
              ].map(({ label, value, sub }) => (
                <div key={label} className="px-6 py-5 text-center">
                  <p className="font-poppins text-2xl font-bold text-primary leading-none">
                    {value}
                  </p>
                  <p className="font-inter text-xs font-semibold text-slate-700 mt-1.5">
                    {label}
                  </p>
                  <p className="font-inter text-[11px] text-slate-400 mt-0.5">
                    {sub}
                  </p>
                </div>
              ))}
            </div>

            {/* Body */}
            <div className="p-8 space-y-7">
              {/* Conversion rate */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-inter text-sm font-semibold text-slate-800">
                      Our placement success rate
                    </p>
                    <p className="font-inter text-xs text-slate-400 mt-0.5">
                      % of our applicants admitted in this field
                    </p>
                  </div>
                  <span className="font-poppins text-2xl font-bold text-primary">
                    {active.conversionRate}%
                  </span>
                </div>
                <ConversionBar value={active.conversionRate} />
              </div>

              <div className="h-px bg-slate-100" />

              {/* Two column: insight + universities */}
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Insight */}
                <div>
                  <p className="font-inter text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
                    Field Insight
                  </p>
                  <p className="font-inter text-sm text-slate-600 leading-relaxed">
                    {active.insight}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/8 flex items-center justify-center">
                      <Users size={14} className="text-primary" />
                    </div>
                    <p className="font-inter text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">
                        {active.bangladeshiShare}
                      </span>{" "}
                      of our Bangladeshi placements are in this field
                    </p>
                  </div>
                </div>

                {/* Top universities */}
                <div>
                  <p className="font-inter text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
                    Our Top Placements
                  </p>
                  <ul className="space-y-2">
                    {active.topUniversities.map((uni) => (
                      <li key={uni} className="flex items-center gap-2.5">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-secondary" />
                        <span className="font-inter text-sm text-slate-700">
                          {uni}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="h-px bg-slate-100" />

              {/* Available programs */}
              <div>
                <p className="font-inter text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
                  Programs We Support
                </p>
                <div className="flex flex-wrap gap-2">
                  {active.majors.map((m) => (
                    <span
                      key={m}
                      className="font-inter text-xs bg-slate-50 border border-slate-100 text-slate-600 px-3 py-1.5 rounded-lg"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link
                href="#consultation"
                className="inline-flex items-center gap-2 bg-primary text-white font-inter font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-primary/90 transition-colors"
              >
                Get guidance for {active.label}
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <p className="font-inter text-xs text-slate-400 text-center mt-10">
          Admit rates reflect typical outcomes at our partner universities.
          Conversion rates based on internal placement data (2022–2024). Salary
          figures sourced from BLS and Open Doors 2024 Report.
        </p>
      </div>
    </section>
  );
}

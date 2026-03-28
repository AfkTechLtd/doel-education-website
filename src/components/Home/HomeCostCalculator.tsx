"use client";

import { useState } from "react";
import { ChevronDown, Calculator, Info } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

type Extra = {
  l: string;
  min: number;
  max: number;
  n?: string;
  isIncome?: boolean;
};
type DegreeData = {
  tuitionMin: number;
  tuitionMax: number;
  note: string;
  extras: Extra[];
};
type DB = Record<string, Record<string, DegreeData>>;

const db: DB = {
  "Computer Science & Engineering": {
    Undergraduate: {
      tuitionMin: 3500000,
      tuitionMax: 5500000,
      note: "MIT, Carnegie Mellon, Georgia Tech, UIUC range",
      extras: [
        { l: "Living & housing", min: 1300000, max: 2200000 },
        { l: "Health insurance", min: 100000, max: 160000 },
        { l: "Books, software & equipment", min: 120000, max: 200000 },
        { l: "SEVIS fee", min: 35000, max: 35000 },
        { l: "Visa (F-1) fee", min: 18000, max: 18000 },
        { l: "Air ticket (one-way)", min: 60000, max: 100000 },
        { l: "Medical exam & tests", min: 8000, max: 15000 },
      ],
    },
    Masters: {
      tuitionMin: 2800000,
      tuitionMax: 4800000,
      note: "Stanford, CMU, Cornell, UT Austin range",
      extras: [
        { l: "Living & housing", min: 1300000, max: 2200000 },
        { l: "Health insurance", min: 100000, max: 160000 },
        { l: "Books & supplies", min: 80000, max: 150000 },
        { l: "SEVIS fee", min: 35000, max: 35000 },
        { l: "Visa (F-1) fee", min: 18000, max: 18000 },
        { l: "Air ticket (one-way)", min: 60000, max: 100000 },
        { l: "Medical exam & tests", min: 8000, max: 15000 },
      ],
    },
    PhD: {
      tuitionMin: 0,
      tuitionMax: 300000,
      note: "Fully funded at most top programs (stipend provided)",
      extras: [
        {
          l: "Stipend / living allowance",
          min: 1500000,
          max: 2500000,
          isIncome: true,
        },
        { l: "Health insurance", min: 0, max: 60000, n: "Usually covered" },
        { l: "SEVIS fee", min: 35000, max: 35000 },
        { l: "Visa (F-1) fee", min: 18000, max: 18000 },
        { l: "Air ticket (one-way)", min: 60000, max: 100000 },
        { l: "Research & conference expenses", min: 30000, max: 80000 },
      ],
    },
  },
  "Business & Management": {
    Undergraduate: {
      tuitionMin: 3000000,
      tuitionMax: 5000000,
      note: "Wharton, Ross, Stern, McCombs range",
      extras: [
        { l: "Living & housing", min: 1200000, max: 2000000 },
        { l: "Health insurance", min: 100000, max: 160000 },
        { l: "Books & case materials", min: 100000, max: 180000 },
        { l: "SEVIS fee", min: 35000, max: 35000 },
        { l: "Visa (F-1) fee", min: 18000, max: 18000 },
        { l: "Air ticket (one-way)", min: 60000, max: 100000 },
        { l: "Medical exam & tests", min: 8000, max: 15000 },
      ],
    },
    Masters: {
      tuitionMin: 4500000,
      tuitionMax: 8000000,
      note: "MBA at HBS, Wharton, Booth, Kellogg range",
      extras: [
        { l: "Living & housing", min: 1500000, max: 2500000 },
        { l: "Health insurance", min: 100000, max: 160000 },
        { l: "Books & materials", min: 100000, max: 200000 },
        { l: "SEVIS fee", min: 35000, max: 35000 },
        { l: "Visa (F-1) fee", min: 18000, max: 18000 },
        { l: "Air ticket (one-way)", min: 60000, max: 100000 },
        { l: "Medical exam & tests", min: 8000, max: 15000 },
      ],
    },
    PhD: {
      tuitionMin: 0,
      tuitionMax: 200000,
      note: "Funded with stipend at most research programs",
      extras: [
        {
          l: "Stipend / living allowance",
          min: 1200000,
          max: 2000000,
          isIncome: true,
        },
        { l: "Health insurance", min: 0, max: 60000, n: "Often covered" },
        { l: "SEVIS fee", min: 35000, max: 35000 },
        { l: "Visa (F-1) fee", min: 18000, max: 18000 },
        { l: "Air ticket (one-way)", min: 60000, max: 100000 },
        { l: "Research expenses", min: 20000, max: 60000 },
      ],
    },
  },
  "Medicine & Health Sciences": {
    Undergraduate: {
      tuitionMin: 2500000,
      tuitionMax: 4500000,
      note: "Pre-Med / Health Sciences at Johns Hopkins, UCLA, UMich",
      extras: [
        { l: "Living & housing", min: 1200000, max: 2000000 },
        { l: "Health insurance", min: 100000, max: 160000 },
        { l: "Lab & equipment fees", min: 100000, max: 200000 },
        { l: "SEVIS fee", min: 35000, max: 35000 },
        { l: "Visa (F-1) fee", min: 18000, max: 18000 },
        { l: "Air ticket (one-way)", min: 60000, max: 100000 },
        { l: "Medical exam & tests", min: 8000, max: 15000 },
      ],
    },
    Masters: {
      tuitionMin: 3000000,
      tuitionMax: 5500000,
      note: "MD programs cost more; MPH/MS range shown",
      extras: [
        { l: "Living & housing", min: 1300000, max: 2200000 },
        { l: "Health insurance", min: 100000, max: 180000 },
        { l: "Lab & clinical fees", min: 150000, max: 300000 },
        { l: "SEVIS fee", min: 35000, max: 35000 },
        { l: "Visa (F-1) fee", min: 18000, max: 18000 },
        { l: "Air ticket (one-way)", min: 60000, max: 100000 },
        { l: "Medical exam & tests", min: 8000, max: 15000 },
      ],
    },
    PhD: {
      tuitionMin: 0,
      tuitionMax: 200000,
      note: "Biomedical PhD usually fully funded",
      extras: [
        {
          l: "Stipend / living allowance",
          min: 1500000,
          max: 2500000,
          isIncome: true,
        },
        { l: "Health insurance", min: 0, max: 60000, n: "Typically covered" },
        { l: "SEVIS fee", min: 35000, max: 35000 },
        { l: "Visa (F-1) fee", min: 18000, max: 18000 },
        { l: "Air ticket (one-way)", min: 60000, max: 100000 },
        { l: "Lab & research costs", min: 20000, max: 60000 },
      ],
    },
  },
  Law: {
    Undergraduate: {
      tuitionMin: 2800000,
      tuitionMax: 4800000,
      note: "Pre-Law / Political Science at top universities",
      extras: [
        { l: "Living & housing", min: 1200000, max: 2000000 },
        { l: "Health insurance", min: 100000, max: 160000 },
        { l: "Books & legal materials", min: 100000, max: 200000 },
        { l: "SEVIS fee", min: 35000, max: 35000 },
        { l: "Visa (F-1) fee", min: 18000, max: 18000 },
        { l: "Air ticket (one-way)", min: 60000, max: 100000 },
        { l: "Medical exam & tests", min: 8000, max: 15000 },
      ],
    },
    Masters: {
      tuitionMin: 5000000,
      tuitionMax: 8500000,
      note: "LLM at Harvard, Yale, Columbia, NYU range",
      extras: [
        { l: "Living & housing", min: 1500000, max: 2500000 },
        { l: "Health insurance", min: 100000, max: 180000 },
        { l: "Books & legal materials", min: 150000, max: 250000 },
        { l: "Bar exam prep (optional)", min: 80000, max: 150000 },
        { l: "SEVIS fee", min: 35000, max: 35000 },
        { l: "Visa (F-1) fee", min: 18000, max: 18000 },
        { l: "Air ticket (one-way)", min: 60000, max: 100000 },
        { l: "Medical exam & tests", min: 8000, max: 15000 },
      ],
    },
    PhD: {
      tuitionMin: 0,
      tuitionMax: 300000,
      note: "JSD / SJD often funded with fellowship",
      extras: [
        {
          l: "Stipend / living allowance",
          min: 1000000,
          max: 1800000,
          isIncome: true,
        },
        { l: "Health insurance", min: 0, max: 60000, n: "Often covered" },
        { l: "SEVIS fee", min: 35000, max: 35000 },
        { l: "Visa (F-1) fee", min: 18000, max: 18000 },
        { l: "Air ticket (one-way)", min: 60000, max: 100000 },
        { l: "Research & publication costs", min: 30000, max: 80000 },
      ],
    },
  },
  "Arts & Humanities": {
    Undergraduate: {
      tuitionMin: 2500000,
      tuitionMax: 4500000,
      note: "Liberal arts, fine arts, literature programs",
      extras: [
        { l: "Living & housing", min: 1200000, max: 2000000 },
        { l: "Health insurance", min: 100000, max: 160000 },
        { l: "Art supplies / studio fees", min: 80000, max: 200000 },
        { l: "SEVIS fee", min: 35000, max: 35000 },
        { l: "Visa (F-1) fee", min: 18000, max: 18000 },
        { l: "Air ticket (one-way)", min: 60000, max: 100000 },
        { l: "Medical exam & tests", min: 8000, max: 15000 },
      ],
    },
    Masters: {
      tuitionMin: 2000000,
      tuitionMax: 4000000,
      note: "MFA, MA programs at RISD, Parsons, NYU range",
      extras: [
        { l: "Living & housing", min: 1200000, max: 2000000 },
        { l: "Health insurance", min: 100000, max: 160000 },
        { l: "Art supplies / studio fees", min: 100000, max: 250000 },
        { l: "SEVIS fee", min: 35000, max: 35000 },
        { l: "Visa (F-1) fee", min: 18000, max: 18000 },
        { l: "Air ticket (one-way)", min: 60000, max: 100000 },
        { l: "Medical exam & tests", min: 8000, max: 15000 },
      ],
    },
    PhD: {
      tuitionMin: 0,
      tuitionMax: 300000,
      note: "Humanities PhD: partial to full funding varies",
      extras: [
        {
          l: "Stipend / living allowance",
          min: 900000,
          max: 1600000,
          isIncome: true,
        },
        { l: "Health insurance", min: 0, max: 80000, n: "Varies by program" },
        { l: "SEVIS fee", min: 35000, max: 35000 },
        { l: "Visa (F-1) fee", min: 18000, max: 18000 },
        { l: "Air ticket (one-way)", min: 60000, max: 100000 },
        { l: "Research & travel grants", min: 30000, max: 80000 },
      ],
    },
  },
  "Natural Sciences": {
    Undergraduate: {
      tuitionMin: 2800000,
      tuitionMax: 5000000,
      note: "Physics, Chemistry, Biology at MIT, Caltech, UC Berkeley",
      extras: [
        { l: "Living & housing", min: 1200000, max: 2000000 },
        { l: "Health insurance", min: 100000, max: 160000 },
        { l: "Lab & equipment fees", min: 80000, max: 180000 },
        { l: "SEVIS fee", min: 35000, max: 35000 },
        { l: "Visa (F-1) fee", min: 18000, max: 18000 },
        { l: "Air ticket (one-way)", min: 60000, max: 100000 },
        { l: "Medical exam & tests", min: 8000, max: 15000 },
      ],
    },
    Masters: {
      tuitionMin: 2500000,
      tuitionMax: 4500000,
      note: "Often partial funding available",
      extras: [
        { l: "Living & housing", min: 1200000, max: 2000000 },
        { l: "Health insurance", min: 100000, max: 160000 },
        { l: "Lab & research fees", min: 80000, max: 180000 },
        { l: "SEVIS fee", min: 35000, max: 35000 },
        { l: "Visa (F-1) fee", min: 18000, max: 18000 },
        { l: "Air ticket (one-way)", min: 60000, max: 100000 },
        { l: "Medical exam & tests", min: 8000, max: 15000 },
      ],
    },
    PhD: {
      tuitionMin: 0,
      tuitionMax: 200000,
      note: "STEM PhD fully funded at most R1 universities",
      extras: [
        {
          l: "Stipend / living allowance",
          min: 1500000,
          max: 2500000,
          isIncome: true,
        },
        { l: "Health insurance", min: 0, max: 60000, n: "Usually covered" },
        { l: "SEVIS fee", min: 35000, max: 35000 },
        { l: "Visa (F-1) fee", min: 18000, max: 18000 },
        { l: "Air ticket (one-way)", min: 60000, max: 100000 },
        { l: "Research materials", min: 20000, max: 60000 },
      ],
    },
  },
  "Social Sciences": {
    Undergraduate: {
      tuitionMin: 2500000,
      tuitionMax: 4500000,
      note: "Economics, Psychology, Sociology at top US schools",
      extras: [
        { l: "Living & housing", min: 1200000, max: 2000000 },
        { l: "Health insurance", min: 100000, max: 160000 },
        { l: "Books & field materials", min: 80000, max: 150000 },
        { l: "SEVIS fee", min: 35000, max: 35000 },
        { l: "Visa (F-1) fee", min: 18000, max: 18000 },
        { l: "Air ticket (one-way)", min: 60000, max: 100000 },
        { l: "Medical exam & tests", min: 8000, max: 15000 },
      ],
    },
    Masters: {
      tuitionMin: 2200000,
      tuitionMax: 4000000,
      note: "MPP, MS Economics, MA Sociology range",
      extras: [
        { l: "Living & housing", min: 1200000, max: 2000000 },
        { l: "Health insurance", min: 100000, max: 160000 },
        { l: "Books & field materials", min: 60000, max: 120000 },
        { l: "SEVIS fee", min: 35000, max: 35000 },
        { l: "Visa (F-1) fee", min: 18000, max: 18000 },
        { l: "Air ticket (one-way)", min: 60000, max: 100000 },
        { l: "Medical exam & tests", min: 8000, max: 15000 },
      ],
    },
    PhD: {
      tuitionMin: 0,
      tuitionMax: 200000,
      note: "Most programs offer TA/RA funding",
      extras: [
        {
          l: "Stipend / living allowance",
          min: 1100000,
          max: 1900000,
          isIncome: true,
        },
        { l: "Health insurance", min: 0, max: 60000, n: "Usually covered" },
        { l: "SEVIS fee", min: 35000, max: 35000 },
        { l: "Visa (F-1) fee", min: 18000, max: 18000 },
        { l: "Air ticket (one-way)", min: 60000, max: 100000 },
        { l: "Research & fieldwork", min: 30000, max: 80000 },
      ],
    },
  },
  "Architecture & Design": {
    Undergraduate: {
      tuitionMin: 3000000,
      tuitionMax: 5500000,
      note: "Harvard GSD, Cornell AAP, SCI-Arc range",
      extras: [
        { l: "Living & housing", min: 1200000, max: 2000000 },
        { l: "Health insurance", min: 100000, max: 160000 },
        { l: "Studio materials & software", min: 150000, max: 300000 },
        { l: "SEVIS fee", min: 35000, max: 35000 },
        { l: "Visa (F-1) fee", min: 18000, max: 18000 },
        { l: "Air ticket (one-way)", min: 60000, max: 100000 },
        { l: "Medical exam & tests", min: 8000, max: 15000 },
      ],
    },
    Masters: {
      tuitionMin: 3500000,
      tuitionMax: 6000000,
      note: "M.Arch at Harvard, Yale, Columbia range",
      extras: [
        { l: "Living & housing", min: 1300000, max: 2200000 },
        { l: "Health insurance", min: 100000, max: 160000 },
        { l: "Studio materials & software", min: 200000, max: 400000 },
        { l: "SEVIS fee", min: 35000, max: 35000 },
        { l: "Visa (F-1) fee", min: 18000, max: 18000 },
        { l: "Air ticket (one-way)", min: 60000, max: 100000 },
        { l: "Medical exam & tests", min: 8000, max: 15000 },
      ],
    },
    PhD: {
      tuitionMin: 0,
      tuitionMax: 300000,
      note: "Design research PhD with partial/full funding",
      extras: [
        {
          l: "Stipend / living allowance",
          min: 1000000,
          max: 1800000,
          isIncome: true,
        },
        { l: "Health insurance", min: 0, max: 80000, n: "Varies" },
        { l: "SEVIS fee", min: 35000, max: 35000 },
        { l: "Visa (F-1) fee", min: 18000, max: 18000 },
        { l: "Air ticket (one-way)", min: 60000, max: 100000 },
        { l: "Studio & research materials", min: 50000, max: 120000 },
      ],
    },
  },
  Education: {
    Undergraduate: {
      tuitionMin: 2000000,
      tuitionMax: 3800000,
      note: "Teaching & education degrees, state schools range",
      extras: [
        { l: "Living & housing", min: 1100000, max: 1800000 },
        { l: "Health insurance", min: 100000, max: 160000 },
        { l: "Books & materials", min: 60000, max: 120000 },
        { l: "SEVIS fee", min: 35000, max: 35000 },
        { l: "Visa (F-1) fee", min: 18000, max: 18000 },
        { l: "Air ticket (one-way)", min: 60000, max: 100000 },
        { l: "Medical exam & tests", min: 8000, max: 15000 },
      ],
    },
    Masters: {
      tuitionMin: 1800000,
      tuitionMax: 3500000,
      note: "MEd, EdM at Teachers College, Harvard Ed range",
      extras: [
        { l: "Living & housing", min: 1100000, max: 1800000 },
        { l: "Health insurance", min: 100000, max: 160000 },
        { l: "Books & materials", min: 60000, max: 120000 },
        { l: "SEVIS fee", min: 35000, max: 35000 },
        { l: "Visa (F-1) fee", min: 18000, max: 18000 },
        { l: "Air ticket (one-way)", min: 60000, max: 100000 },
        { l: "Medical exam & tests", min: 8000, max: 15000 },
      ],
    },
    PhD: {
      tuitionMin: 0,
      tuitionMax: 200000,
      note: "EdD / PhD often funded with teaching assistantship",
      extras: [
        {
          l: "Stipend / living allowance",
          min: 900000,
          max: 1500000,
          isIncome: true,
        },
        { l: "Health insurance", min: 0, max: 60000, n: "Varies" },
        { l: "SEVIS fee", min: 35000, max: 35000 },
        { l: "Visa (F-1) fee", min: 18000, max: 18000 },
        { l: "Air ticket (one-way)", min: 60000, max: 100000 },
        { l: "Research & fieldwork", min: 20000, max: 60000 },
      ],
    },
  },
};

const destinations = ["USA"];
const degreeLevels = ["Undergraduate", "Masters", "PhD"];
const majors = Object.keys(db);

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number): string {
  if (n === 0) return "০";
  return "৳ " + n.toLocaleString("en-BD");
}

function fmtRange(min: number, max: number): string {
  if (min === max) return fmt(min);
  if (min === 0) return "৳ 0 – " + fmt(max);
  return fmt(min) + " – " + fmt(max);
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SelectField({
  label,
  value,
  options,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  placeholder: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-600">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown
          size={15}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
      </div>
    </div>
  );
}

// ─── Result Table ─────────────────────────────────────────────────────────────

function ResultTable({
  major,
  degree,
  destination,
  data,
}: {
  major: string;
  degree: string;
  destination: string;
  data: DegreeData;
}) {
  const isPHD = degree === "PhD";
  const stipendRow = data.extras.find((r) => r.isIncome);
  const costRows = data.extras.filter((r) => !r.isIncome);

  const totalMin = data.tuitionMin + costRows.reduce((s, r) => s + r.min, 0);
  const totalMax = data.tuitionMax + costRows.reduce((s, r) => s + r.max, 0);

  const netMin =
    isPHD && stipendRow ? Math.max(0, totalMin - stipendRow.max) : null;
  const netMax =
    isPHD && stipendRow ? Math.max(0, totalMax - stipendRow.min) : null;

  return (
    <div className="mt-6 rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-5 py-4 bg-slate-50 border-b border-slate-100">
        <p className="text-xs text-slate-400">Estimate for</p>
        <p className="text-base font-semibold text-slate-800 mt-0.5">
          {major} · {degree} · {destination}
        </p>
        <p className="text-xs text-slate-400 mt-1">{data.note}</p>
      </div>

      {/* Stipend banner */}
      {isPHD && stipendRow && (
        <div className="px-5 py-3 bg-emerald-50 border-b border-emerald-100 flex items-center gap-2">
          <span className="text-emerald-600 text-xs font-medium">
            ✓ Stipend provided:{" "}
            <strong>{fmtRange(stipendRow.min, stipendRow.max)} / year</strong> —
            offset against your costs
          </span>
        </div>
      )}

      {/* Disclaimer */}
      <div className="px-5 py-3 bg-amber-50/60 border-b border-amber-100 flex items-start gap-2">
        <Info size={13} className="text-amber-500 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-slate-500">
          Approximate estimates based on 2024–25 US university data. Actual
          costs vary by institution, city, and scholarship.
        </p>
      </div>

      {/* Table */}
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-primary">
            <th className="text-left px-5 py-3 text-xs font-semibold text-white/70 uppercase tracking-wider">
              Cost item
            </th>
            <th className="text-right px-5 py-3 text-xs font-semibold text-white/70 uppercase tracking-wider">
              Amount (BDT approx.)
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Tuition row */}
          <tr className="border-t border-slate-50 hover:bg-primary/[0.03] transition-colors">
            <td className="px-5 py-3">
              <p className="text-xs font-medium text-slate-700">
                {isPHD ? "Tuition fee (funded)" : "Tuition fee (per year)"}
              </p>
              {isPHD && (
                <p className="text-[10px] text-slate-400 mt-0.5 italic">
                  Usually waived with funding
                </p>
              )}
            </td>
            <td className="px-5 py-3 text-right text-xs font-semibold text-slate-800 whitespace-nowrap">
              {fmtRange(data.tuitionMin, data.tuitionMax)}
            </td>
          </tr>

          {/* Cost rows */}
          {costRows.map((row) => (
            <tr
              key={row.l}
              className="border-t border-slate-50 hover:bg-primary/[0.03] transition-colors"
            >
              <td className="px-5 py-3">
                <p className="text-xs font-medium text-slate-700">{row.l}</p>
                {row.n && (
                  <p className="text-[10px] text-slate-400 mt-0.5 italic">
                    {row.n}
                  </p>
                )}
              </td>
              <td className="px-5 py-3 text-right text-xs font-semibold text-slate-800 whitespace-nowrap">
                {fmtRange(row.min, row.max)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-primary/10 bg-primary/5">
            <td className="px-5 py-4 text-sm font-bold text-primary">
              Total per year
            </td>
            <td className="px-5 py-4 text-right text-sm font-bold text-primary whitespace-nowrap">
              {fmtRange(totalMin, totalMax)}
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Net out-of-pocket (PhD only) */}
      {isPHD && netMin !== null && netMax !== null && (
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Estimated out-of-pocket after stipend:
          </span>
          <span className="text-sm font-semibold text-slate-800">
            {fmtRange(netMin, netMax)} / year
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const HomeCostCalculator = () => {
  const [form, setForm] = useState({ destination: "", degree: "", major: "" });
  const [result, setResult] = useState<{
    destination: string;
    degree: string;
    major: string;
  } | null>(null);

  const set = (k: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const canSubmit = !!(form.destination && form.degree && form.major);

  const handleCalculate = () => {
    if (!canSubmit) return;
    setResult({ ...form });
  };

  const handleReset = () => {
    setForm({ destination: "", degree: "", major: "" });
    setResult(null);
  };

  const resultData = result ? db[result.major]?.[result.degree] : null;

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      {/* Section header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8 bg-secondary block" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Cost Estimator
          </span>
        </div>
        <h2 className="font-poppins text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 max-w-xl">
          Calculate Your{" "}
          <span className="text-primary relative inline-block">
            Study Abroad
            <span className="absolute -bottom-1 left-0 h-[2.5px] w-full bg-secondary rounded-full" />
          </span>{" "}
          Costs in Minutes
        </h2>
        <p className="mt-3 text-sm text-slate-400 max-w-lg">
          Get a personalised BDT estimate of what it costs a Bangladeshi student
          to study in the USA — tuition, visa, living, and everything in
          between.
        </p>
      </div>

      {/* Card */}
      <div className="rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/80 overflow-hidden">
        {/* Green banner */}
        <div className="bg-primary px-8 py-6 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
            <Calculator size={18} className="text-white" />
          </div>
          <div>
            <h3 className="font-poppins font-bold text-white text-lg leading-tight">
              Study Cost Calculator
            </h3>
            <p className="text-white/55 text-xs mt-0.5">
              All amounts in Bangladeshi Taka (BDT) — approximate estimates
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="bg-slate-50/40 p-8 space-y-5">
          {/* Selects */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SelectField
              label="Study destination"
              value={form.destination}
              options={destinations}
              placeholder="Select destination"
              onChange={set("destination")}
            />
            <SelectField
              label="Degree level"
              value={form.degree}
              options={degreeLevels}
              placeholder="Select degree"
              onChange={set("degree")}
            />
            <SelectField
              label="Major / field"
              value={form.major}
              options={majors}
              placeholder="Select major"
              onChange={set("major")}
            />
          </div>

          {/* CTA */}
          <button
            onClick={handleCalculate}
            disabled={!canSubmit}
            className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            Calculate cost estimate
          </button>

          {/* Result */}
          {result && resultData && (
            <div>
              <div className="flex justify-end">
                <button
                  onClick={handleReset}
                  className="text-xs text-slate-400 hover:text-primary transition-colors"
                >
                  ↺ Reset
                </button>
              </div>
              <ResultTable
                major={result.major}
                degree={result.degree}
                destination={result.destination}
                data={resultData}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeCostCalculator;

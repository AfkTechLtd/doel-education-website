"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Calculator, ChevronDown, RotateCcw, Info } from "lucide-react";

type CostRow = { label: string; min: number; max: number; note?: string };

const costData: Record<string, Record<string, CostRow[]>> = {
  USA: {
    Undergraduate: [
      { label: "Tuition Fee (per year)",       min: 2500000, max: 4500000 },
      { label: "Living & Housing (per year)",  min: 1200000, max: 2000000 },
      { label: "Health Insurance (per year)",  min: 80000,   max: 150000  },
      { label: "Application Fee",              min: 6000,    max: 12000   },
      { label: "SEVIS Fee",                    min: 35000,   max: 35000   },
      { label: "Visa Application Fee",         min: 18000,   max: 18000   },
      { label: "Air Ticket (one-way)",         min: 60000,   max: 100000  },
      { label: "Medical Exam & Tests",         min: 8000,    max: 15000   },
      { label: "Books & Supplies (per year)",  min: 80000,   max: 150000  },
    ],
    Masters: [
      { label: "Tuition Fee (per year)",       min: 2000000, max: 3800000 },
      { label: "Living & Housing (per year)",  min: 1200000, max: 2000000 },
      { label: "Health Insurance (per year)",  min: 80000,   max: 150000  },
      { label: "Application Fee",              min: 6000,    max: 15000   },
      { label: "SEVIS Fee",                    min: 35000,   max: 35000   },
      { label: "Visa Application Fee",         min: 18000,   max: 18000   },
      { label: "Air Ticket (one-way)",         min: 60000,   max: 100000  },
      { label: "Medical Exam & Tests",         min: 8000,    max: 15000   },
      { label: "Books & Supplies (per year)",  min: 50000,   max: 100000  },
    ],
    PhD: [
      { label: "Tuition Fee (funded/yr)",      min: 0,       max: 500000, note: "Usually waived with funding" },
      { label: "Stipend / Living Allowance",   min: 1200000, max: 2200000, note: "Provided by university" },
      { label: "Health Insurance",             min: 0,       max: 80000,  note: "Often covered by university" },
      { label: "Application Fee",              min: 6000,    max: 15000   },
      { label: "SEVIS Fee",                    min: 35000,   max: 35000   },
      { label: "Visa Application Fee",         min: 18000,   max: 18000   },
      { label: "Air Ticket (one-way)",         min: 60000,   max: 100000  },
      { label: "Medical Exam & Tests",         min: 8000,    max: 15000   },
      { label: "Research & Misc. Expenses",    min: 30000,   max: 80000   },
    ],
  },
};

const destinations = Object.keys(costData);
const degreeLevels = ["Undergraduate", "Masters", "PhD"];

function fmt(n: number) {
  if (n === 0) return "00";
  return "\u09F3 " + n.toLocaleString("en-BD");
}

function fmtRange(min: number, max: number) {
  if (min === max) return fmt(min);
  if (min === 0) return "00 \u2013 " + fmt(max);
  return fmt(min) + " \u2013 " + fmt(max);
}

function SelectField({ label, value, options, onChange, required }: {
  label: string; value: string; options: string[];
  onChange: (v: string) => void; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-slate-700 font-poppins">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 font-inter focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
        >
          <option value="">Select...</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}

function InputField({ label, type = "text", placeholder, value, onChange, required }: {
  label: string; type?: string; placeholder?: string;
  value: string; onChange: (v: string) => void; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-slate-700 font-poppins">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 font-inter placeholder:text-slate-300 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
      />
    </div>
  );
}

const CostCalculator = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    destination: "", degree: "",
  });
  const [result, setResult] = useState<{ destination: string; degree: string } | null>(null);

  const rows = result ? (costData[result.destination]?.[result.degree] ?? []) : [];
  const totalMin = rows.reduce((s, r) => s + r.min, 0);
  const totalMax = rows.reduce((s, r) => s + r.max, 0);

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    if (!form.destination || !form.degree) return;
    setResult({ destination: form.destination, degree: form.degree });
  };

  const handleReset = () => {
    setForm({ firstName: "", lastName: "", email: "", phone: "", destination: "", degree: "" });
    setResult(null);
  };

  return (
    <section className="py-20">
      {/* Header */}
      <div ref={ref} className="mb-10">
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <span className="h-px w-8 bg-secondary block" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] font-inter text-primary">
            Cost Estimator
          </span>
        </motion.div>

        <motion.h2
          className="font-poppins text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 max-w-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Calculate Your{" "}
          <span className="text-primary relative inline-block">
            Study Abroad
            <motion.span
              className="absolute -bottom-1 left-0 h-[2.5px] bg-secondary rounded-full"
              style={{ width: "100%", originX: 0 }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.45, delay: 0.5 }}
            />
          </span>{" "}
          Costs in Minutes
        </motion.h2>

        <motion.p
          className="mt-3 text-sm text-slate-400 font-inter max-w-lg"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Get a personalised BDT estimate of what it costs a Bangladeshi student to study in the USA — tuition, visa, living, and everything in between.
        </motion.p>
      </div>

      {/* Card */}
      <motion.div
        className="rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/80 overflow-hidden"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.25 }}
      >
        {/* Green banner */}
        <div className="bg-primary px-8 py-6 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
            <Calculator size={18} className="text-white" />
          </div>
          <div>
            <h3 className="font-poppins font-bold text-white text-lg leading-tight">
              Study Cost Calculator
            </h3>
            <p className="text-white/55 text-xs font-inter mt-0.5">
              All amounts in Bangladeshi Taka (BDT) — approximate estimates
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="bg-slate-50/40 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">

          {/* LEFT: Form */}
          <div className="p-8 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <InputField label="First Name" placeholder="Rafiq" value={form.firstName} onChange={set("firstName")} required />
              <InputField label="Last Name" placeholder="Hossain" value={form.lastName} onChange={set("lastName")} required />
            </div>
            <InputField label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} required />
            <InputField label="Phone Number" type="tel" placeholder="+880 1X XX XXX XXX" value={form.phone} onChange={set("phone")} />
            <SelectField label="Study Destination" value={form.destination} options={destinations} onChange={set("destination")} required />
            <SelectField label="Degree Level" value={form.degree} options={degreeLevels} onChange={set("degree")} required />

            <button
              onClick={handleSubmit}
              disabled={!form.destination || !form.degree}
              className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white font-poppins shadow-md shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              Check Your Cost For Study Abroad
            </button>
          </div>

          {/* RIGHT: Result */}
          <div className="p-8 flex flex-col min-h-[420px]">
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center gap-4 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/6 flex items-center justify-center">
                    <Calculator size={28} className="text-primary/30" />
                  </div>
                  <p className="text-sm text-slate-400 font-inter max-w-xs leading-relaxed">
                    Fill in the form and click <span className="font-semibold text-primary">Check Your Cost</span> to see your personalised cost breakdown in BDT.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-4 flex-1"
                >
                  {/* Result meta */}
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-slate-400 font-inter">Showing estimate for</p>
                      <p className="font-poppins font-bold text-primary text-base leading-tight mt-0.5">
                        {result.degree} · {result.destination}
                      </p>
                    </div>
                    <button
                      onClick={handleReset}
                      className="flex items-center gap-1.5 text-xs text-slate-400 font-inter hover:text-primary transition-colors mt-1"
                    >
                      <RotateCcw size={12} />
                      Reset
                    </button>
                  </div>

                  {/* Disclaimer */}
                  <div className="flex items-start gap-2 rounded-xl bg-secondary/8 border border-secondary/20 px-3 py-2.5">
                    <Info size={13} className="text-secondary mt-0.5 flex-shrink-0" />
                    <p className="text-[11px] text-slate-500 font-inter leading-relaxed">
                      Estimated <strong>{result.degree}</strong> cost in the <strong>{result.destination}</strong> for Bangladeshi students. Actual expenses may vary.
                    </p>
                  </div>

                  {/* Table */}
                  <div className="flex-1 overflow-auto rounded-2xl border border-slate-100 bg-white">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-primary">
                          <th className="text-left px-4 py-3 text-[11px] font-semibold text-white/70 font-inter uppercase tracking-wider">
                            Cost
                          </th>
                          <th className="text-right px-4 py-3 text-[11px] font-semibold text-white/70 font-inter uppercase tracking-wider">
                            Amount (BDT Approx.)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, i) => (
                          <motion.tr
                            key={row.label}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.045 }}
                            className="border-t border-slate-50 hover:bg-primary/3 transition-colors"
                          >
                            <td className="px-4 py-3">
                              <p className="text-[12px] font-medium text-slate-700 font-inter">{row.label}</p>
                              {row.note && (
                                <p className="text-[10px] text-slate-400 font-inter mt-0.5 italic">{row.note}</p>
                              )}
                            </td>
                            <td className="px-4 py-3 text-right text-[12px] font-semibold text-slate-800 font-poppins whitespace-nowrap">
                              {fmtRange(row.min, row.max)}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t-2 border-primary/15 bg-primary/5">
                          <td className="px-4 py-3.5 text-sm font-bold text-primary font-poppins">
                            Total Estimate
                          </td>
                          <td className="px-4 py-3.5 text-right text-sm font-bold text-primary font-poppins whitespace-nowrap">
                            {fmtRange(totalMin, totalMax)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CostCalculator;
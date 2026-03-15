import { ClipboardList, Compass, FileCheck, MessageSquare } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Understand your goals",
    desc: "We start by learning about your academic background, target schools, and career vision.",
  },
  {
    icon: Compass,
    title: "Map out your options",
    desc: "Your advisor will shortlist US programs that fit your profile, budget, and intake timeline.",
  },
  {
    icon: ClipboardList,
    title: "Break down the process",
    desc: "Get a clear overview of visa, applications, tests, and deadlines — no overwhelm.",
  },
  {
    icon: FileCheck,
    title: "Walk away with a plan",
    desc: "Leave the session with a written action plan and next steps you can start that day.",
  },
];

export default function WhatToExpect() {
  return (
    <section>
      <span className="text-xs font-semibold tracking-widest uppercase text-primary font-inter">
        What happens in your session
      </span>
      <h2 className="mt-2 text-3xl font-bold text-slate-900 font-poppins leading-snug">
        Your 30 minutes, <br /> put to real use
      </h2>
      <p className="mt-4 text-slate-500 font-inter leading-relaxed">
        This is a focused, advisor-led session — not a sales call. Every minute is structured so you leave with clarity.
      </p>

      <ul className="mt-10 flex flex-col gap-7">
        {steps.map(({ icon: Icon, title, desc }, i) => (
          <li key={title} className="flex items-start gap-4 rounded-xl p-3 -mx-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm hover:bg-slate-50">
            <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary" strokeWidth={1.8} />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 font-inter tracking-widest uppercase">Step {i + 1}</span>
              <h3 className="text-base font-semibold text-slate-900 font-poppins mt-0.5">{title}</h3>
              <p className="text-sm text-slate-500 font-inter mt-1 leading-relaxed">{desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

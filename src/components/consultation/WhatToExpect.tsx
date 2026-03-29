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
    desc: "Get a clear overview of visa, applications, tests, and deadlines  no overwhelm.",
  },
  {
    icon: FileCheck,
    title: "Walk away with a plan",
    desc: "Leave the session with a written action plan and next steps you can start that day.",
  },
];

export default function WhatToExpect() {
  return (
    <section className="space-y-6">
      <div>
        <span className="text-secondary tracking-widest text-sm font-bold uppercase">
          What to expect
        </span>
        <h2 className="mt-3 text-4xl font-semibold font-inter text-slate-900 leading-tight">
          Your 30 minutes,
          <br /> put to real use
        </h2>
        <p className="mt-4 text-gray-500 font-semibold text-lg max-w-md">
          A focused session with a real advisor not a sales call. Every minute
          is structured so you leave with clarity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {steps.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="flex gap-4 p-4 rounded-lg shadow-lg border border-gray-200 items-start bg-white"
          >
            <div className="p-2 bg-primary/10 rounded-md shrink-0">
              <Icon size={24} className="text-primary" strokeWidth={1.8} />
            </div>
            <div>
              <h5 className="font-semibold text-gray-900">{title}</h5>
              <p className="text-gray-500 text-sm leading-relaxed mt-1">
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

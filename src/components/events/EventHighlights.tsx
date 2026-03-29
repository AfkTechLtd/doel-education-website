"use client";

import { MapPinned, Mic2, Star, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AnimatedNumber from "@/components/Home/HomeAnimationNumber";

const stats = [
  {
    icon: Users,
    value: 1200,
    suffix: "+",
    label: "Event Attendees",
    sub: "Across webinars and seminars",
  },
  {
    icon: Mic2,
    value: 35,
    suffix: "",
    label: "Sessions Hosted",
    sub: "Online and in-person",
  },
  {
    icon: MapPinned,
    value: 12,
    suffix: "",
    label: "Cities Reached",
    sub: "Across Bangladesh",
  },
  {
    icon: Star,
    value: 5,
    suffix: "/5",
    label: "Average Rating",
    sub: "Based on post-event feedback",
  },
];

export default function EventHighlights() {
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-gray-50/70 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-14">
        <div className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-4">
              <p className="shrink-0 text-sm font-bold uppercase tracking-widest text-secondary">
                Event Impact
              </p>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <h2 className="font-poppins text-2xl font-semibold leading-tight text-primary md:text-3xl">
              Practical sessions, strong turnout, and outcomes students
              remember.
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-slate-500 md:text-base">
            Every event is built to answer real study abroad questions, reduce
            uncertainty, and give students clearer next steps after the session
            ends.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {stats.map(({ icon: Icon, value, suffix, label, sub }, index) => (
            <div
              key={label}
              className={`relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border px-4 py-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:py-10 ${
                index === 0
                  ? "border-primary bg-primary text-white"
                  : "border-slate-100 bg-white shadow-sm"
              }`}
            >
              <div
                className={`absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-10 ${
                  index === 0 ? "bg-white" : "bg-primary"
                }`}
              />

              <Icon
                size={18}
                className={`mb-3 ${index === 0 ? "text-white/90" : "text-primary"}`}
              />

              <p
                className={`font-poppins text-3xl font-bold leading-none tabular-nums sm:text-4xl ${
                  index === 0 ? "text-white" : "text-primary"
                }`}
              >
                <AnimatedNumber
                  target={value}
                  suffix={suffix}
                  duration={1800}
                  started={hasStarted}
                />
              </p>

              <p
                className={`mt-2 font-poppins text-sm font-semibold leading-snug ${
                  index === 0 ? "text-white/90" : "text-slate-800"
                }`}
              >
                {label}
              </p>

              <p
                className={`mt-1 font-inter text-xs ${
                  index === 0 ? "text-white/55" : "text-slate-400"
                }`}
              >
                {sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

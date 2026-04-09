"use client";

import { motion, useReducedMotion } from "framer-motion";
import DashboardAnimatedNumber from "../../shared/DashboardAnimatedNumber";
import DashboardPanel from "../../shared/DashboardPanel";
import { applicationOutcomes } from "./overview.data";

const radius = 54;
const strokeWidth = 14;

export default function OverviewApplicationOutcomesChart() {
  const shouldReduceMotion = useReducedMotion();
  const total = applicationOutcomes.reduce((sum, item) => sum + item.value, 0);

  let cumulativeFraction = 0;
  const segments = applicationOutcomes.map((item) => {
    const fraction = item.value / total;
    const rotation = cumulativeFraction * 360 - 90;
    cumulativeFraction += fraction;

    return {
      ...item,
      fraction,
      rotation,
      percentage: Math.round(fraction * 100),
    };
  });

  return (
    <DashboardPanel
      title="Application Outcomes"
      description="Current result mix across active application files."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
        <div className="flex justify-center">
          <div className="relative flex h-56 w-56 items-center justify-center">
            <svg viewBox="0 0 140 140" className="h-full w-full">
              <circle
                cx="70"
                cy="70"
                r={radius}
                fill="none"
                stroke="#e7edf1"
                strokeWidth={strokeWidth}
              />

              {segments.map((segment, index) => (
                <motion.circle
                  key={segment.label}
                  cx="70"
                  cy="70"
                  r={radius}
                  fill="none"
                  stroke={segment.color}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  transform={`rotate(${segment.rotation} 70 70)`}
                  initial={
                    shouldReduceMotion ? false : { pathLength: 0, opacity: 0.7 }
                  }
                  animate={{ pathLength: segment.fraction, opacity: 1 }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              ))}
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Total
              </p>
              <p className="mt-2 min-w-[3ch] text-center font-poppins text-4xl font-semibold tabular-nums text-slate-900">
                <DashboardAnimatedNumber value={total} duration={950} />
              </p>
              <p className="mt-1 font-inter text-sm text-slate-500">
                Active files
              </p>
            </div>
          </div>
        </div>

        <div className="min-w-0 space-y-3">
          {segments.map((segment, index) => (
            <motion.div
              key={segment.label}
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.16 + index * 0.06 }}
              className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <div className="min-w-0 flex items-center gap-3">
                <span
                  className="block h-3 w-3 rounded-full"
                  style={{ backgroundColor: segment.color }}
                />
                <div className="min-w-0">
                  <p className="font-inter text-sm font-semibold text-slate-900">
                    {segment.label}
                  </p>
                  <p className="truncate font-inter text-xs text-slate-500">
                    {segment.percentage}% of active applications
                  </p>
                </div>
              </div>

              <p className="min-w-[3ch] text-right font-poppins text-xl font-semibold tabular-nums text-slate-900">
                <DashboardAnimatedNumber value={segment.value} duration={850} />
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardPanel>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import DashboardAnimatedNumber from "../../shared/DashboardAnimatedNumber";
import DashboardPanel from "../../shared/DashboardPanel";
import { monthlyActivity, overviewInsights } from "./overview.data";

export default function OverviewActivityChart() {
  const maxValue = Math.max(...monthlyActivity.map((item) => item.value));
  const shouldReduceMotion = useReducedMotion();

  return (
    <DashboardPanel
      title="Monthly Activity"
      description="Monthly movement across uploads, profile progress, and application handling."
    >
      <div className="space-y-6">
        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-5 sm:px-5">
          <div className="relative h-40 sm:h-44">
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between py-1">
              {[0, 1, 2, 3].map((line) => (
                <div key={line} className="border-t border-slate-200/80" />
              ))}
            </div>

            <div className="relative grid h-full grid-cols-6 items-end gap-3">
              {monthlyActivity.map((item, index) => (
                <div key={item.label} className="flex h-full items-end">
                  <motion.div
                    initial={shouldReduceMotion ? false : { scaleY: 0, opacity: 0.85 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    transition={{
                      duration: 0.55,
                      delay: index * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`w-full origin-bottom rounded-t-2xl transition-colors duration-200 hover:bg-primary ${
                      index === monthlyActivity.length - 1
                        ? "bg-secondary"
                        : "bg-primary/85"
                    }`}
                    style={{ height: `${(item.value / maxValue) * 100}%` }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-6 gap-3">
            {monthlyActivity.map((item, index) => (
              <div key={item.label} className="text-center">
                <p className="font-inter text-sm font-semibold text-slate-900">
                  <span className="tabular-nums">
                    <DashboardAnimatedNumber value={item.value} duration={850} />
                  </span>
                </p>
                <p
                  className={`font-inter text-xs ${
                    index === monthlyActivity.length - 1
                      ? "font-semibold text-primary"
                      : "text-slate-400"
                  }`}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {overviewInsights.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.28 + index * 0.05 }}
                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                </div>
                <div>
                  <p className="font-inter text-sm font-medium text-slate-500">
                    {item.label}
                  </p>
                  <p className="mt-1 flex items-baseline gap-1 font-poppins text-xl font-semibold text-slate-900">
                    <span className="tabular-nums">
                      <DashboardAnimatedNumber value={item.value} duration={950} />
                    </span>
                    <span className="font-inter text-sm font-medium text-slate-500">
                      {item.suffix}
                    </span>
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </DashboardPanel>
  );
}

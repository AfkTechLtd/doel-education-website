"use client";

import type { EventFilter } from "./UpcomingEventsGrid";

export const EVENT_CHIPS = [
  "All",
  "Past Events",
  "Upcoming Events",
] as const satisfies EventFilter[];

interface Props {
  active: EventFilter;
  onSelect: (chip: EventFilter) => void;
  totalCount: number;
}

export default function EventTypeChips({
  active,
  onSelect,
  totalCount,
}: Props) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-8 md:px-14 md:py-8">
      <div className="rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
              Browse by timeline
            </p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
              Switch between upcoming sessions and past event recaps without leaving the page.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {EVENT_CHIPS.map((chip) => {
              const isActive = active === chip;

              return (
                <button
                  key={chip}
                  onClick={() => onSelect(chip)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "border-primary bg-primary text-white shadow-lg shadow-primary/15"
                      : "border-slate-200 bg-white text-slate-600 hover:border-primary/30 hover:text-primary"
                  }`}
                >
                  {chip}
                </button>
              );
            })}

            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-500">
              {totalCount} showing
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

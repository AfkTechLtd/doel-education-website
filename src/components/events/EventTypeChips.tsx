"use client";

import type { EventType } from "./UpcomingEventsGrid";

export const EVENT_CHIPS = [
  "All",
  "Webinar",
  "Visa Session",
  "Seminar",
  "Workshop",
] as const satisfies EventType[];

interface Props {
  active: EventType;
  onSelect: (chip: EventType) => void;
  totalCount: number;
}

export default function EventTypeChips({
  active,
  onSelect,
  totalCount,
}: Props) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-14 py-6 md:py-8">
      <div
        className="flex items-center gap-2 overflow-x-auto pb-1"
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE 10+
        }}
      >
        <style>
          {`
            ::-webkit-scrollbar {
              display: none; /* Chrome, Safari */
            }
          `}
        </style>

        {EVENT_CHIPS.map((chip) => {
          const isActive = active === chip;
          return (
            <button
              key={chip}
              onClick={() => onSelect(chip)}
              className={`
                relative shrink-0 px-4 sm:px-5 py-2 rounded-full text-sm font-semibold
                border transition-all duration-200
                ${
                  isActive
                    ? "bg-primary text-white border-primary shadow-lg"
                    : "bg-white text-gray-600 border-gray-200 hover:border-primary/40 hover:text-primary"
                }
              `}
            >
              {chip}
            </button>
          );
        })}
      </div>
    </div>
  );
}

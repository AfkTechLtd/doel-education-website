"use client";

import { useEffect, useRef, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

export type StudentDocumentFilter =
  | "ALL"
  | "PENDING"
  | "UNDER_REVIEW"
  | "RECEIVED"
  | "VERIFIED"
  | "REJECTED"
  | "WAIVED";

type StudentDocumentToolbarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  filter: StudentDocumentFilter;
  onFilterChange: (value: StudentDocumentFilter) => void;
};

const filterOptions: Array<{ value: StudentDocumentFilter; label: string }> = [
  { value: "ALL", label: "All" },
  { value: "PENDING", label: "Pending" },
  { value: "UNDER_REVIEW", label: "Under Review" },
  { value: "RECEIVED", label: "Received" },
  { value: "VERIFIED", label: "Verified" },
  { value: "REJECTED", label: "Rejected" },
  { value: "WAIVED", label: "Waived" },
];

export default function StudentDocumentToolbar({
  query,
  onQueryChange,
  filter,
  onFilterChange,
}: StudentDocumentToolbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <label className="relative block w-full max-w-xl">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search documents"
          className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 font-inter text-sm text-slate-900 outline-none transition focus:border-primary"
          aria-label="Search documents"
        />
      </label>

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className={filter === "ALL"
            ? "inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-inter text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
            : "inline-flex items-center gap-2 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 font-inter text-sm font-semibold text-primary transition hover:border-primary/30"
          }
          aria-expanded={isOpen}
          aria-haspopup="menu"
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          Filter
        </button>

        {isOpen ? (
          <div className="absolute right-0 top-[calc(100%+0.75rem)] z-20 min-w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg shadow-slate-200/80">
            {filterOptions.map((option) => {
              const isActive = option.value === filter;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onFilterChange(option.value);
                    setIsOpen(false);
                  }}
                  className={isActive
                    ? "flex w-full items-center justify-between rounded-xl bg-primary px-3 py-2.5 font-inter text-sm font-semibold text-white"
                    : "flex w-full items-center justify-between rounded-xl px-3 py-2.5 font-inter text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                  }
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

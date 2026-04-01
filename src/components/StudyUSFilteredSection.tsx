"use client";

import { useState, useMemo } from "react";
import {
  Search,
  X,
  MapPin,
  Clock,
  GraduationCap,
  BookOpen,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────
type StudyLevel = "Undergraduate" | "Graduate" | "Doctorate";
type Intake = "Fall 2025" | "Spring 2026" | "Fall 2026";

interface Course {
  id: number;
  title: string;
  university: string;
  location: string;
  state: string;
  faculty: string;
  studyLevel: StudyLevel;
  duration: string;
  intake: Intake;
  tuitionPerYear: string;
  ranking: string; // e.g. "#3 in CS"
  highlight?: string; // optional badge
}

// ─── Data ──────────────────────────────────────────────────────────────────
const COURSES: Course[] = [
  // Business & Management
  {
    id: 1,
    title: "BSc Business Administration",
    university: "University of Pennsylvania (Wharton)",
    location: "Philadelphia, PA",
    state: "Pennsylvania",
    faculty: "Business & Management",
    studyLevel: "Undergraduate",
    duration: "4 Years",
    intake: "Fall 2025",
    tuitionPerYear: "$62,044/yr",
    ranking: "#1 Undergrad Business",
    highlight: "Top Ranked",
  },
  {
    id: 2,
    title: "MBA (Master of Business Administration)",
    university: "Harvard University",
    location: "Cambridge, MA",
    state: "Massachusetts",
    faculty: "Business & Management",
    studyLevel: "Graduate",
    duration: "2 Years",
    intake: "Fall 2025",
    tuitionPerYear: "$73,440/yr",
    ranking: "#2 MBA Program",
    highlight: "High Demand",
  },
  {
    id: 3,
    title: "BSc Finance & Economics",
    university: "New York University (Stern)",
    location: "New York City, NY",
    state: "New York",
    faculty: "Business & Management",
    studyLevel: "Undergraduate",
    duration: "4 Years",
    intake: "Spring 2026",
    tuitionPerYear: "$58,168/yr",
    ranking: "#7 Business School",
  },
  {
    id: 4,
    title: "MS Business Analytics",
    university: "University of Chicago (Booth)",
    location: "Chicago, IL",
    state: "Illinois",
    faculty: "Business & Management",
    studyLevel: "Graduate",
    duration: "1.5 Years",
    intake: "Fall 2026",
    tuitionPerYear: "$69,000/yr",
    ranking: "#3 MBA Program",
  },

  // Computer Science & IT
  {
    id: 5,
    title: "BSc Computer Science",
    university: "Massachusetts Institute of Technology",
    location: "Cambridge, MA",
    state: "Massachusetts",
    faculty: "Computer Science & IT",
    studyLevel: "Undergraduate",
    duration: "4 Years",
    intake: "Fall 2025",
    tuitionPerYear: "$57,986/yr",
    ranking: "#1 Computer Science",
    highlight: "Top Ranked",
  },
  {
    id: 6,
    title: "MS Artificial Intelligence",
    university: "Stanford University",
    location: "Stanford, CA",
    state: "California",
    faculty: "Computer Science & IT",
    studyLevel: "Graduate",
    duration: "2 Years",
    intake: "Fall 2025",
    tuitionPerYear: "$60,861/yr",
    ranking: "#2 AI Program",
    highlight: "High Demand",
  },
  {
    id: 7,
    title: "BSc Data Science",
    university: "Carnegie Mellon University",
    location: "Pittsburgh, PA",
    state: "Pennsylvania",
    faculty: "Computer Science & IT",
    studyLevel: "Undergraduate",
    duration: "4 Years",
    intake: "Fall 2026",
    tuitionPerYear: "$59,864/yr",
    ranking: "#1 Data Science",
  },
  {
    id: 8,
    title: "MS Cybersecurity",
    university: "UC Berkeley",
    location: "Berkeley, CA",
    state: "California",
    faculty: "Computer Science & IT",
    studyLevel: "Graduate",
    duration: "2 Years",
    intake: "Spring 2026",
    tuitionPerYear: "$29,342/yr",
    ranking: "#4 CS Program",
  },

  // Engineering
  {
    id: 9,
    title: "BSc Mechanical Engineering",
    university: "Georgia Institute of Technology",
    location: "Atlanta, GA",
    state: "Georgia",
    faculty: "Engineering",
    studyLevel: "Undergraduate",
    duration: "4 Years",
    intake: "Fall 2025",
    tuitionPerYear: "$33,794/yr",
    ranking: "#4 Engineering",
    highlight: "Best Value",
  },
  {
    id: 10,
    title: "BSc Electrical Engineering",
    university: "Purdue University",
    location: "West Lafayette, IN",
    state: "Indiana",
    faculty: "Engineering",
    studyLevel: "Undergraduate",
    duration: "4 Years",
    intake: "Fall 2025",
    tuitionPerYear: "$28,794/yr",
    ranking: "#6 Engineering",
    highlight: "Best Value",
  },
  {
    id: 11,
    title: "MS Civil Engineering",
    university: "University of Illinois Urbana-Champaign",
    location: "Champaign, IL",
    state: "Illinois",
    faculty: "Engineering",
    studyLevel: "Graduate",
    duration: "2 Years",
    intake: "Fall 2026",
    tuitionPerYear: "$31,564/yr",
    ranking: "#5 Engineering",
  },
  {
    id: 12,
    title: "PhD Aerospace Engineering",
    university: "Massachusetts Institute of Technology",
    location: "Cambridge, MA",
    state: "Massachusetts",
    faculty: "Engineering",
    studyLevel: "Doctorate",
    duration: "4–6 Years",
    intake: "Fall 2025",
    tuitionPerYear: "$57,986/yr",
    ranking: "#1 Aerospace",
  },

  // Health & Medicine
  {
    id: 13,
    title: "BSc Biomedical Sciences",
    university: "Johns Hopkins University",
    location: "Baltimore, MD",
    state: "Maryland",
    faculty: "Health & Medicine",
    studyLevel: "Undergraduate",
    duration: "4 Years",
    intake: "Fall 2025",
    tuitionPerYear: "$60,480/yr",
    ranking: "#1 Biomedical",
    highlight: "Top Ranked",
  },
  {
    id: 14,
    title: "MS Public Health (MPH)",
    university: "Harvard University",
    location: "Cambridge, MA",
    state: "Massachusetts",
    faculty: "Health & Medicine",
    studyLevel: "Graduate",
    duration: "2 Years",
    intake: "Fall 2025",
    tuitionPerYear: "$54,296/yr",
    ranking: "#1 Public Health",
  },
  {
    id: 15,
    title: "BSc Nursing Science",
    university: "University of Pennsylvania",
    location: "Philadelphia, PA",
    state: "Pennsylvania",
    faculty: "Health & Medicine",
    studyLevel: "Undergraduate",
    duration: "4 Years",
    intake: "Spring 2026",
    tuitionPerYear: "$62,044/yr",
    ranking: "#3 Nursing",
  },

  // Law & Social Sciences
  {
    id: 16,
    title: "BA Political Science",
    university: "Georgetown University",
    location: "Washington, DC",
    state: "Washington DC",
    faculty: "Law & Social Sciences",
    studyLevel: "Undergraduate",
    duration: "4 Years",
    intake: "Fall 2025",
    tuitionPerYear: "$61,872/yr",
    ranking: "#1 Political Science",
    highlight: "High Demand",
  },
  {
    id: 17,
    title: "JD Law",
    university: "Yale University",
    location: "New Haven, CT",
    state: "Connecticut",
    faculty: "Law & Social Sciences",
    studyLevel: "Graduate",
    duration: "3 Years",
    intake: "Fall 2026",
    tuitionPerYear: "$70,920/yr",
    ranking: "#1 Law School",
    highlight: "Top Ranked",
  },
  {
    id: 18,
    title: "BA International Relations",
    university: "Columbia University",
    location: "New York City, NY",
    state: "New York",
    faculty: "Law & Social Sciences",
    studyLevel: "Undergraduate",
    duration: "4 Years",
    intake: "Fall 2025",
    tuitionPerYear: "$65,524/yr",
    ranking: "#5 Social Sciences",
  },

  // Natural Sciences
  {
    id: 19,
    title: "BSc Biological Sciences",
    university: "Stanford University",
    location: "Stanford, CA",
    state: "California",
    faculty: "Natural Sciences",
    studyLevel: "Undergraduate",
    duration: "4 Years",
    intake: "Fall 2025",
    tuitionPerYear: "$60,861/yr",
    ranking: "#2 Biology",
    highlight: "Top Ranked",
  },
  {
    id: 20,
    title: "PhD Chemistry",
    university: "California Institute of Technology",
    location: "Pasadena, CA",
    state: "California",
    faculty: "Natural Sciences",
    studyLevel: "Doctorate",
    duration: "4–5 Years",
    intake: "Fall 2026",
    tuitionPerYear: "$60,816/yr",
    ranking: "#1 Chemistry",
  },
  {
    id: 21,
    title: "BS Environmental Science",
    university: "UC San Diego",
    location: "La Jolla, CA",
    state: "California",
    faculty: "Natural Sciences",
    studyLevel: "Undergraduate",
    duration: "4 Years",
    intake: "Spring 2026",
    tuitionPerYear: "$44,066/yr",
    ranking: "#7 Earth Sciences",
  },

  // Arts & Humanities
  {
    id: 22,
    title: "BA Architecture",
    university: "Cornell University",
    location: "Ithaca, NY",
    state: "New York",
    faculty: "Arts & Humanities",
    studyLevel: "Undergraduate",
    duration: "5 Years",
    intake: "Fall 2025",
    tuitionPerYear: "$63,200/yr",
    ranking: "#2 Architecture",
    highlight: "Creative",
  },
  {
    id: 23,
    title: "MFA Fine Arts",
    university: "Yale University",
    location: "New Haven, CT",
    state: "Connecticut",
    faculty: "Arts & Humanities",
    studyLevel: "Graduate",
    duration: "2 Years",
    intake: "Fall 2026",
    tuitionPerYear: "$70,920/yr",
    ranking: "#1 Fine Arts MFA",
  },
];

const FACULTIES = [
  "All Courses",
  "Business & Management",
  "Computer Science & IT",
  "Engineering",
  "Health & Medicine",
  "Law & Social Sciences",
  "Natural Sciences",
  "Arts & Humanities",
];

const STUDY_LEVELS: StudyLevel[] = ["Undergraduate", "Graduate", "Doctorate"];
const INTAKES: Intake[] = ["Fall 2025", "Spring 2026", "Fall 2026"];

// ─── Highlight badge colors ────────────────────────────────────────────────
const BADGE: Record<string, { bg: string; text: string }> = {
  "Top Ranked": { bg: "#EDE9FE", text: "#5B21B6" },
  "High Demand": { bg: "#FEF3C7", text: "#92400E" },
  "Best Value": { bg: "#D1FAE5", text: "#065F46" },
  Creative: { bg: "#FCE7F3", text: "#9D174D" },
};

// ─── Sub-components ────────────────────────────────────────────────────────

function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span
      className="inline-flex items-center gap-1 max-w-full min-w-0 px-3 py-1 rounded-full text-xs font-semibold transition-opacity hover:opacity-80"
      style={{ backgroundColor: "var(--primary, #1a3c5e)", color: "#fff" }}
    >
      <span className="truncate">{label}</span>
      <button
        type="button"
        aria-label={`Remove ${label} filter`}
        className="flex-shrink-0 rounded-full p-0.5 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        <X size={11} strokeWidth={2.5} />
      </button>
    </span>
  );
}

function CourseCard({ course }: { course: Course }) {
  const badge = course.highlight ? BADGE[course.highlight] : null;
  return (
    <div className="flex flex-col sm:flex-row gap-0 w-full max-w-full min-w-0 rounded-2xl overflow-hidden border border-slate-100 bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group">
      {/* Left accent bar */}
      <div
        className="w-full sm:w-1.5 h-1.5 sm:h-auto flex-shrink-0 rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none"
        style={{ backgroundColor: facultyColor(course.faculty) }}
      />

      {/* Body */}
      <div className="flex-1 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Faculty tag */}
            <span
              className="inline-block text-[10px] font-bold uppercase tracking-widest mb-1.5"
              style={{ color: facultyColor(course.faculty) }}
            >
              {course.faculty}
            </span>
            {/* Title */}
            <h3 className="font-poppins font-bold text-slate-800 text-[15px] leading-snug group-hover:text-primary transition-colors">
              {course.title}
            </h3>
            {/* University + location */}
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5">
              <span
                className="text-xs font-semibold break-words min-w-0"
                style={{ color: facultyColor(course.faculty) }}
              >
                {course.university}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <MapPin size={11} /> {course.location}
              </span>
            </div>
          </div>
          {/* Badge */}
          {badge && (
            <span
              className="flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: badge.bg, color: badge.text }}
            >
              {course.highlight}
            </span>
          )}
        </div>

        {/* Meta row */}
        <div className="mt-4 flex flex-wrap gap-2">
          <MetaPill
            icon={<GraduationCap size={12} />}
            label={course.studyLevel}
          />
          <MetaPill icon={<Clock size={12} />} label={course.duration} />
          <MetaPill icon={<BookOpen size={12} />} label={course.intake} />
          <MetaPill
            icon={<span className="text-[10px] font-black">$</span>}
            label={course.tuitionPerYear}
            muted={false}
          />
        </div>
      </div>

      {/* Right: ranking + CTA — stack on narrow cards so nothing clips */}
      <div className="w-full flex flex-col gap-3 px-5 py-4 border-t border-slate-100 sm:w-auto sm:min-w-[148px] sm:flex-col sm:items-end sm:justify-center sm:border-l sm:border-t-0">
        <div className="text-left sm:text-right min-w-0 w-full sm:w-auto">
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
            QS Ranking
          </p>
          <p className="text-xs font-bold text-slate-700 mt-0.5 break-words">
            {course.ranking}
          </p>
        </div>
        <button
          type="button"
          className="w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-xl text-xs font-bold transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{
            backgroundColor: facultyColor(course.faculty) + "18",
            color: facultyColor(course.faculty),
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

function MetaPill({
  icon,
  label,
  muted = true,
}: {
  icon: React.ReactNode;
  label: string;
  muted?: boolean;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
      style={{
        backgroundColor: muted ? "#f1f5f9" : "#eff6ff",
        color: muted ? "#64748b" : "#1d4ed8",
      }}
    >
      {icon}
      {label}
    </span>
  );
}

function facultyColor(faculty: string): string {
  const map: Record<string, string> = {
    "Business & Management": "#1a3c5e",
    "Computer Science & IT": "#2563eb",
    Engineering: "#7c3aed",
    "Health & Medicine": "#059669",
    "Law & Social Sciences": "#d97706",
    "Natural Sciences": "#0891b2",
    "Arts & Humanities": "#db2777",
  };
  return map[faculty] ?? "#1a3c5e";
}

// ─── Main Component ─────────────────────────────────────────────────────────
export default function CourseBrowser() {
  const [query, setQuery] = useState("");
  const [activeFaculty, setActiveFaculty] = useState("All Courses");
  const [selectedLevels, setSelectedLevels] = useState<StudyLevel[]>([]);
  const [selectedIntakes, setSelectedIntakes] = useState<Intake[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const allStates = useMemo(
    () => Array.from(new Set(COURSES.map((c) => c.state))).sort(),
    [],
  );

  // Active filter chips (for display)
  const activeChips: { label: string; clear: () => void }[] = [
    ...(activeFaculty !== "All Courses"
      ? [{ label: activeFaculty, clear: () => setActiveFaculty("All Courses") }]
      : []),
    ...selectedLevels.map((l) => ({
      label: l,
      clear: () => setSelectedLevels((prev) => prev.filter((x) => x !== l)),
    })),
    ...selectedIntakes.map((i) => ({
      label: i,
      clear: () => setSelectedIntakes((prev) => prev.filter((x) => x !== i)),
    })),
    ...selectedStates.map((s) => ({
      label: s,
      clear: () => setSelectedStates((prev) => prev.filter((x) => x !== s)),
    })),
  ];

  const filtered = useMemo(() => {
    return COURSES.filter((c) => {
      if (activeFaculty !== "All Courses" && c.faculty !== activeFaculty)
        return false;
      if (selectedLevels.length && !selectedLevels.includes(c.studyLevel))
        return false;
      if (selectedIntakes.length && !selectedIntakes.includes(c.intake))
        return false;
      if (selectedStates.length && !selectedStates.includes(c.state))
        return false;
      if (query) {
        const q = query.toLowerCase();
        return (
          c.title.toLowerCase().includes(q) ||
          c.university.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeFaculty, selectedLevels, selectedIntakes, selectedStates, query]);

  const resetAll = () => {
    setActiveFaculty("All Courses");
    setSelectedLevels([]);
    setSelectedIntakes([]);
    setSelectedStates([]);
    setQuery("");
  };

  // Toggle helpers
  const toggleLevel = (l: StudyLevel) =>
    setSelectedLevels((p) =>
      p.includes(l) ? p.filter((x) => x !== l) : [...p, l],
    );
  const toggleIntake = (i: Intake) =>
    setSelectedIntakes((p) =>
      p.includes(i) ? p.filter((x) => x !== i) : [...p, i],
    );
  const toggleState = (s: string) =>
    setSelectedStates((p) =>
      p.includes(s) ? p.filter((x) => x !== s) : [...p, s],
    );

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full min-w-0">
      {/* ── Section Header ── */}
      <div className="mb-8 sm:mb-10 min-w-0">
        <div className="flex items-center gap-3 mb-3">
          <span className="h-px w-8 bg-slate-300 shrink-0" />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
            Explore Programs
          </span>
          <span className="h-px w-8 bg-slate-300 shrink-0" />
        </div>
        <h2 className="font-poppins text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight text-balance break-words">
          Find Your{" "}
          <span className="text-primary relative inline-block">
            Perfect Course
            <span
              className="absolute -bottom-1 left-0 h-[2.5px] rounded-full bg-secondary"
              style={{ width: "100%" }}
            />
          </span>{" "}
          in the USA
        </h2>
        <p className="mt-3 text-sm text-slate-400 max-w-lg">
          Browse programs from America&apos;s top-ranked universities filtered
          by faculty, level, intake, and state.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch lg:items-start w-full min-w-0">
        {/* ════════════════════════════
            LEFT SIDEBAR (desktop)
            ════════════════════════════ */}
        <aside className="hidden lg:flex flex-col gap-4 w-60 shrink-0 sticky top-6 self-start">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-slate-700">Filters</span>
              {activeChips.length > 0 && (
                <button
                  type="button"
                  onClick={resetAll}
                  className="text-xs text-primary hover:underline"
                >
                  Reset all
                </button>
              )}
            </div>

            {/* Active chips */}
            {activeChips.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4 pb-4 border-b border-slate-100">
                {activeChips.map((chip) => (
                  <FilterChip
                    key={chip.label}
                    label={chip.label}
                    onRemove={chip.clear}
                  />
                ))}
              </div>
            )}

            {/* Study Level */}
            <FilterSection
              title="Study Level"
              items={STUDY_LEVELS}
              selected={selectedLevels}
              onToggle={toggleLevel as (v: string) => void}
            />

            {/* Intake */}
            <FilterSection
              title="Intake"
              items={INTAKES}
              selected={selectedIntakes}
              onToggle={toggleIntake as (v: string) => void}
            />

            {/* State */}
            <FilterSection
              title="State"
              items={allStates}
              selected={selectedStates}
              onToggle={toggleState}
              collapsible
            />
          </div>
        </aside>

        {/* ════════════════════════════
            MAIN CONTENT
            ════════════════════════════ */}
        <div className="flex-1 min-w-0 w-full max-w-full">
          {/* Search bar */}
          <div className="relative mb-5 min-w-0">
            <Search
              size={16}
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search courses, universities, locations…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full min-w-0 pl-10 sm:pl-11 pr-10 sm:pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            {query && (
              <button
                type="button"
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                onClick={() => setQuery("")}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Mobile filter bar */}
          <div className="flex lg:hidden gap-2 mb-4 min-w-0 items-stretch">
            <button
              type="button"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex shrink-0 items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-600"
            >
              <SlidersHorizontal size={13} /> Filters
              {activeChips.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-primary text-white text-[9px] flex items-center justify-center">
                  {activeChips.length}
                </span>
              )}
            </button>
            {activeChips.length > 0 && (
              <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch] [scrollbar-width:thin]">
                {activeChips.map((chip) => (
                  <FilterChip
                    key={chip.label}
                    label={chip.label}
                    onRemove={chip.clear}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Mobile filter panel */}
          {showMobileFilters && (
            <div className="lg:hidden bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-4 max-h-[min(70vh,28rem)] overflow-y-auto overscroll-contain min-h-0">
              <FilterSection
                title="Study Level"
                items={STUDY_LEVELS}
                selected={selectedLevels}
                onToggle={toggleLevel as (v: string) => void}
              />
              <FilterSection
                title="Intake"
                items={INTAKES}
                selected={selectedIntakes}
                onToggle={toggleIntake as (v: string) => void}
              />
              <FilterSection
                title="State"
                items={allStates}
                selected={selectedStates}
                onToggle={toggleState}
                collapsible
              />
            </div>
          )}

          {/* Faculty pills — horizontal scroll on small screens to avoid layout blowout */}
          <div className="mb-5 min-w-0">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Popular Faculties
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible [-webkit-overflow-scrolling:touch] [scrollbar-width:thin]">
              {FACULTIES.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActiveFaculty(f)}
                  className="shrink-0 px-3.5 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs font-semibold border transition-all duration-150 whitespace-nowrap"
                  style={
                    activeFaculty === f
                      ? {
                          backgroundColor:
                            f === "All Courses" ? "#1a3c5e" : facultyColor(f),
                          borderColor:
                            f === "All Courses" ? "#1a3c5e" : facultyColor(f),
                          color: "#fff",
                        }
                      : {
                          backgroundColor: "#fff",
                          borderColor: "#e2e8f0",
                          color: "#475569",
                        }
                  }
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-4 min-w-0">
            <h3 className="font-poppins font-bold text-slate-800 text-base sm:text-lg min-w-0">
              <span className="block sm:inline">Available Courses </span>
              <span className="text-sm font-normal text-slate-400 break-words">
                ({filtered.length} result{filtered.length !== 1 ? "s" : ""}{" "}
                found)
              </span>
            </h3>
          </div>

          {/* Course cards */}
          {filtered.length > 0 ? (
            <div className="flex flex-col gap-3">
              {filtered.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400">
              <BookOpen size={36} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">
                No courses match your filters.
              </p>
              <button
                type="button"
                onClick={resetAll}
                className="mt-3 text-xs text-primary hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Reusable filter section ────────────────────────────────────────────────
function FilterSection({
  title,
  items,
  selected,
  onToggle,
  collapsible = false,
}: {
  title: string;
  items: readonly string[];
  selected: string[];
  onToggle: (v: string) => void;
  collapsible?: boolean;
}) {
  const [open, setOpen] = useState(true);
  const visible = collapsible && !open ? items.slice(0, 4) : items;

  return (
    <div className="mb-4 pb-4 border-b border-slate-100 last:border-0 last:mb-0 last:pb-0">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between mb-2.5 group text-left min-w-0"
      >
        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
          {title}
        </span>
        <ChevronDown
          size={13}
          className={`text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div className="flex flex-col gap-1.5">
        {visible.map((item) => {
          const checked = selected.includes(item);
          return (
            <label
              key={item}
              className="flex items-center gap-2.5 cursor-pointer group/item"
              onClick={() => onToggle(item)}
            >
              <span
                className="w-4 h-4 rounded flex-shrink-0 border flex items-center justify-center transition-all duration-150"
                style={
                  checked
                    ? { backgroundColor: "#1a3c5e", borderColor: "#1a3c5e" }
                    : { backgroundColor: "#fff", borderColor: "#cbd5e1" }
                }
              >
                {checked && (
                  <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                    <path
                      d="M1 3.5L3.5 6L8 1"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span className="text-xs text-slate-600 group-hover/item:text-slate-900 transition-colors min-w-0 break-words">
                {item}
              </span>
            </label>
          );
        })}
        {collapsible && items.length > 4 && (
          <button
            type="button"
            className="text-left text-[11px] text-primary hover:underline mt-0.5 font-medium"
            onClick={() => setOpen((p) => !p)}
          >
            {open ? "Show less" : `+${items.length - 4} more`}
          </button>
        )}
      </div>
    </div>
  );
}

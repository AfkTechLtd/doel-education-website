"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import type {
  StudentResourceCategory,
  ResourceTemplateType,
} from "@/data/student-resource-categories";
import StudentResourceCategoryCard from "./StudentResourceCategoryCard";

type StudentResourcesGalleryProps = {
  categories: StudentResourceCategory[];
};

type ResourceFilter = "ALL" | ResourceTemplateType;

const filterOptions: Array<{ value: ResourceFilter; label: string }> = [
  { value: "ALL", label: "All" },
  { value: "SOP", label: "SOP" },
  { value: "LOR", label: "LOR" },
  { value: "AFFIDAVIT", label: "Affidavit" },
];

function matchesQuery(category: StudentResourceCategory, query: string) {
  if (!query) {
    return true;
  }

  const searchableText = [category.title, category.type, category.description]
    .join(" ")
    .toLowerCase();

  return searchableText.includes(query);
}

export default function StudentResourcesGallery({ categories }: StudentResourcesGalleryProps) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<ResourceFilter>("ALL");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!filterRef.current?.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsFilterOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const filteredCategories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return categories.filter((category) => {
      const matchesType = activeFilter === "ALL" || category.type === activeFilter;
      return matchesType && matchesQuery(category, normalizedQuery);
    });
  }, [activeFilter, categories, query]);

  return (
    <div className="space-y-6">
      

      {filteredCategories.length ? (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
          {filteredCategories.map((category) => (
            <StudentResourceCategoryCard key={category.id} category={category} />
          ))}
        </section>
      ) : (
        <section className="rounded-[1.85rem] border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
          <p className="font-poppins text-2xl font-semibold text-slate-900">No categories found</p>
          <p className="mt-2 font-inter text-sm leading-relaxed text-slate-500">
            Try another search term or choose a different filter.
          </p>
        </section>
      )}
    </div>
  );
}

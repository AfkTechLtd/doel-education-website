"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { LocalResourceTemplate } from "@/data/student-resource-templates";
import StudentResourceTemplateCard from "./StudentResourceTemplateCard";

type StudentCategoryTemplateGalleryProps = {
  templates: LocalResourceTemplate[];
  placeholder: string;
};

function matchesQuery(template: LocalResourceTemplate, query: string) {
  if (!query) {
    return true;
  }

  const searchableText = [
    template.title,
    template.type,
    template.description ?? "",
    template.content ?? "",
  ]
    .join(" ")
    .toLowerCase();

  return searchableText.includes(query);
}

export default function StudentCategoryTemplateGallery({
  templates,
  placeholder,
}: StudentCategoryTemplateGalleryProps) {
  const [query, setQuery] = useState("");

  const filteredTemplates = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return templates.filter((template) => matchesQuery(template, normalizedQuery));
  }, [query, templates]);

  return (
    <div className="space-y-6">
      <label className="relative block max-w-xl">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 font-inter text-sm text-slate-900 outline-none transition focus:border-primary focus:bg-white"
          aria-label={placeholder}
        />
      </label>

      {filteredTemplates.length ? (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
          {filteredTemplates.map((template) => (
            <StudentResourceTemplateCard key={template.id} template={template} />
          ))}
        </section>
      ) : (
        <section className="rounded-[1.85rem] border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
          <p className="font-poppins text-2xl font-semibold text-slate-900">No templates found</p>
          <p className="mt-2 font-inter text-sm leading-relaxed text-slate-500">
            Try another search term to browse more templates in this category.
          </p>
        </section>
      )}
    </div>
  );
}

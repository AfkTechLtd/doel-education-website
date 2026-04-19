"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import type { StudentDocumentRequirement } from "@/data/student-document-requirements";
import type { LocalStudentDocument, StudentDocumentStatus } from "@/data/student-documents";
import StudentDocumentCard from "./StudentDocumentCard";
import StudentDocumentToolbar, { type StudentDocumentFilter } from "./StudentDocumentToolbar";
import StudentRequiredDocumentCard from "./StudentRequiredDocumentCard";

type StudentDocumentVaultProps = {
  documents: LocalStudentDocument[];
  requirements: StudentDocumentRequirement[];
};

type VaultView = "ALL_FILES" | "REQUIRED_DOCUMENTS";

function matchesFilter(status: StudentDocumentStatus, filter: StudentDocumentFilter) {
  return filter === "ALL" || status === filter;
}

function matchesQuery(document: LocalStudentDocument, query: string) {
  if (!query) {
    return true;
  }

  const searchableText = [
    document.name,
    document.type,
    document.status,
    document.matchedLabel ?? "",
    document.notes ?? "",
  ]
    .join(" ")
    .toLowerCase();

  return searchableText.includes(query);
}

export default function StudentDocumentVault({
  documents,
  requirements,
}: StudentDocumentVaultProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<StudentDocumentFilter>("ALL");
  const [view, setView] = useState<VaultView>("ALL_FILES");

  const filteredDocuments = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return documents.filter((document) => {
      return matchesFilter(document.status, filter) && matchesQuery(document, normalizedQuery);
    });
  }, [documents, filter, query]);

  const filteredRequirements = useMemo(() => {
    if (filter === "ALL") {
      return requirements;
    }

    return requirements.filter((requirement) => requirement.status === filter);
  }, [filter, requirements]);

  return (
    <div className="space-y-6">
      <StudentDocumentToolbar
        query={query}
        onQueryChange={setQuery}
        filter={filter}
        onFilterChange={setFilter}
      />

      <div className="inline-flex rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
        <button
          type="button"
          onClick={() => setView("ALL_FILES")}
          className={cn(
            "rounded-[0.9rem] px-4 py-2.5 font-inter text-sm font-semibold transition",
            view === "ALL_FILES"
              ? "bg-primary text-white"
              : "text-slate-500 hover:text-slate-900",
          )}
        >
          All Files
        </button>
        <button
          type="button"
          onClick={() => setView("REQUIRED_DOCUMENTS")}
          className={cn(
            "rounded-[0.9rem] px-4 py-2.5 font-inter text-sm font-semibold transition",
            view === "REQUIRED_DOCUMENTS"
              ? "bg-primary text-white"
              : "text-slate-500 hover:text-slate-900",
          )}
        >
          Required Documents
        </button>
      </div>

      {view === "ALL_FILES" ? (
        filteredDocuments.length ? (
          <section className="space-y-4">
            {filteredDocuments.map((document) => (
              <StudentDocumentCard key={document.id} document={document} />
            ))}
          </section>
        ) : (
          <section className="rounded-[1.85rem] border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <p className="font-poppins text-2xl font-semibold text-slate-900">No matching documents</p>
            <p className="mt-2 font-inter text-sm leading-relaxed text-slate-500">
              Try a different search or filter to find the files you need.
            </p>
          </section>
        )
      ) : filteredRequirements.length ? (
        <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {filteredRequirements.map((requirement) => (
            <StudentRequiredDocumentCard key={requirement.id} requirement={requirement} />
          ))}
        </section>
      ) : (
        <section className="rounded-[1.85rem] border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
          <p className="font-poppins text-2xl font-semibold text-slate-900">No requirements match this filter</p>
          <p className="mt-2 font-inter text-sm leading-relaxed text-slate-500">
            Choose another status filter to review more required document items.
          </p>
        </section>
      )}
    </div>
  );
}

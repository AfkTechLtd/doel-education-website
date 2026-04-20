"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { listStudentDocuments } from "@/actions/documents";
import DashboardStatusBadge from "@/components/dashboard/shared/DashboardStatusBadge";
import type { SelectedDocumentReference, VaultDocumentListItem } from "@/lib/documents/types";

type VaultDocumentSelectorProps = {
  onSelect: (document: SelectedDocumentReference) => void;
  allowedTypes?: string[];
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export default function VaultDocumentSelector({
  onSelect,
  allowedTypes,
}: VaultDocumentSelectorProps) {
  const [query, setQuery] = useState("");
  const [documents, setDocuments] = useState<VaultDocumentListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadDocuments() {
      setIsLoading(true);
      setLoadError(null);

      const result = await listStudentDocuments();

      if (!mounted) {
        return;
      }

      if (!result.success) {
        setLoadError(result.error ?? "Failed to load vault documents.");
        setDocuments([]);
        setIsLoading(false);
        return;
      }

      setDocuments(result.data ?? []);
      setIsLoading(false);
    }

    loadDocuments();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredDocuments = useMemo(() => {
    const normalizedQuery = normalize(query);
    const normalizedAllowedTypes = (allowedTypes ?? []).map(normalize);

    return documents.filter((document) => {
      const matchesAllowedType =
        !normalizedAllowedTypes.length ||
        normalizedAllowedTypes.includes(normalize(document.type));

      if (!matchesAllowedType) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const searchable = [document.name, document.type, document.status]
        .join(" ")
        .toLowerCase();

      return searchable.includes(normalizedQuery);
    });
  }, [allowedTypes, documents, query]);

  return (
    <div className="space-y-5">
      <label className="relative block">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search vault documents"
          className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 font-inter text-sm text-slate-900 outline-none transition focus:border-primary"
          aria-label="Search vault documents"
        />
      </label>

      {isLoading ? (
        <div className="rounded-[1.6rem] border border-slate-200 bg-slate-50 p-6 font-inter text-sm text-slate-500">
          Loading documents...
        </div>
      ) : loadError ? (
        <div className="rounded-[1.6rem] border border-red-200 bg-red-50 p-6 font-inter text-sm text-red-700">
          {loadError}
        </div>
      ) : filteredDocuments.length ? (
        <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
          {filteredDocuments.map((document) => (
            <div
              key={document.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-primary/20 hover:shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-poppins text-base font-semibold text-slate-900">
                    {document.name}
                  </p>
                  <p className="mt-1 font-inter text-sm text-slate-500">{document.type}</p>
                </div>

                <DashboardStatusBadge status={document.status.replaceAll("_", " ")} />
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => onSelect(document)}
                  className="inline-flex items-center justify-center rounded-2xl bg-primary px-4 py-2.5 font-inter text-sm font-semibold text-white transition hover:bg-primary/90"
                >
                  Use This File
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-[1.6rem] border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <p className="font-poppins text-xl font-semibold text-slate-900">No matching files</p>
          <p className="mt-2 font-inter text-sm text-slate-500">
            Try another search term or upload a new document.
          </p>
        </div>
      )}
    </div>
  );
}

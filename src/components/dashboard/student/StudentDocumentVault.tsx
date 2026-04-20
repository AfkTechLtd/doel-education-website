"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteStudentDocument, setRequiredDocumentLink } from "@/actions/documents";
import DocumentPickerModal from "@/components/common/documents/DocumentPickerModal";
import { cn } from "@/lib/utils";
import type { StudentDocumentRequirement } from "@/data/student-document-requirements";
import type {
  RequiredDocumentLinkItem,
  SelectedDocumentReference,
  StudentDocumentStatus,
  VaultDocumentListItem,
} from "@/lib/documents/types";
import StudentDocumentCard from "./StudentDocumentCard";
import StudentDocumentToolbar, { type StudentDocumentFilter } from "./StudentDocumentToolbar";
import StudentRequiredDocumentCard from "./StudentRequiredDocumentCard";

type StudentDocumentVaultProps = {
  documents: VaultDocumentListItem[];
  requirements: StudentDocumentRequirement[];
  requiredLinks: RequiredDocumentLinkItem[];
};

type VaultView = "ALL_FILES" | "REQUIRED_DOCUMENTS";

function matchesFilter(status: StudentDocumentStatus, filter: StudentDocumentFilter) {
  return filter === "ALL" || status === filter;
}

function matchesQuery(document: VaultDocumentListItem, query: string) {
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
  requiredLinks,
}: StudentDocumentVaultProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<StudentDocumentFilter>("ALL");
  const [view, setView] = useState<VaultView>("ALL_FILES");
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deletingId, startDeleting] = useTransition();
  const [activeDeletingId, setActiveDeletingId] = useState<string | null>(null);
  const [pickerRequirement, setPickerRequirement] = useState<StudentDocumentRequirement | null>(null);
  const [linkError, setLinkError] = useState<string | null>(null);
  const [isLinking, startLinking] = useTransition();

  const requiredLinkMap = useMemo(() => {
    return requiredLinks.reduce<Record<string, SelectedDocumentReference & { type: string }>>(
      (accumulator, link) => {
        accumulator[link.contextKey] = link.document;
        return accumulator;
      },
      {},
    );
  }, [requiredLinks]);

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

  function handleDelete(documentId: string) {
    setDeleteError(null);
    setActiveDeletingId(documentId);

    startDeleting(async () => {
      const result = await deleteStudentDocument(documentId);

      if (!result.success) {
        setDeleteError(result.error ?? "Failed to delete the document.");
        setActiveDeletingId(null);
        return;
      }

      router.refresh();
      setActiveDeletingId(null);
    });
  }

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

      {deleteError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 font-inter text-sm text-red-700">
          {deleteError}
        </div>
      ) : null}

      {linkError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 font-inter text-sm text-red-700">
          {linkError}
        </div>
      ) : null}

      {view === "ALL_FILES" ? (
        filteredDocuments.length ? (
          <section className="space-y-4">
            {filteredDocuments.map((document) => (
              <StudentDocumentCard
                key={document.id}
                document={document}
                onDelete={handleDelete}
                isDeleting={deletingId && activeDeletingId === document.id}
              />
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
            <StudentRequiredDocumentCard
              key={requirement.id}
              requirement={requirement}
              linkedFileName={requiredLinkMap[requirement.id]?.name}
              linkedStatus={requiredLinkMap[requirement.id]?.status}
              onChooseDocument={setPickerRequirement}
              disabled={isLinking}
            />
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

      <DocumentPickerModal
        open={Boolean(pickerRequirement)}
        onClose={() => setPickerRequirement(null)}
        title={pickerRequirement
          ? `Choose Document for ${pickerRequirement.label}`
          : "Choose Document"}
        allowedTypes={pickerRequirement ? [pickerRequirement.type] : undefined}
        onSelect={(document) => {
          if (!pickerRequirement) {
            return;
          }

          setLinkError(null);
          const selectedRequirement = pickerRequirement;

          startLinking(async () => {
            const result = await setRequiredDocumentLink(selectedRequirement.id, document.id);

            if (!result.success) {
              setLinkError(result.error ?? "Failed to link required document.");
              return;
            }

            setPickerRequirement(null);
            router.refresh();
          });
        }}
      />
    </div>
  );
}

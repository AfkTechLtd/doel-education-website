"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  getDocumentLinkUsage,
  hardDeleteStudentDocument,
  deleteStudentDocument,
  removeDocumentLink,
  setRequiredDocumentLink,
} from "@/actions/documents";
import DocumentPickerModal from "@/components/common/documents/DocumentPickerModal";
import { useToast } from "@/components/common/feedback/ToastProvider";
import StudentDocumentDeleteModal from "@/components/dashboard/student/StudentDocumentDeleteModal";
import { cn } from "@/lib/utils";
import type { StudentDocumentRequirement } from "@/data/student-document-requirements";
import type {
  DocumentLinkUsage,
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
  const [deletingId, startDeleting] = useTransition();
  const [activeDeletingId, setActiveDeletingId] = useState<string | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<{ id: string; name: string } | null>(null);
  const [deleteUsage, setDeleteUsage] = useState<DocumentLinkUsage | null>(null);
  const [isLoadingDeleteUsage, setIsLoadingDeleteUsage] = useState(false);
  const [pickerRequirement, setPickerRequirement] = useState<StudentDocumentRequirement | null>(null);
  const [isLinking, startLinking] = useTransition();
  const { showToast } = useToast();

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
    const requirementsWithStatus = requirements.map((requirement) => {
      const linkedStatus = requiredLinkMap[requirement.id]?.status;
      const effectiveStatus: StudentDocumentStatus = linkedStatus ?? "PENDING";

      return {
        requirement,
        effectiveStatus,
      };
    });

    if (filter === "ALL") {
      return requirementsWithStatus;
    }

    return requirementsWithStatus.filter((item) => item.effectiveStatus === filter);
  }, [filter, requiredLinkMap, requirements]);

  function handleDelete(documentId: string) {
    setActiveDeletingId(documentId);

    startDeleting(async () => {
      const result = await deleteStudentDocument(documentId);

      if (!result.success) {
        showToast({
          variant: "error",
          title: "Delete failed",
          description: result.error ?? "Failed to delete the document.",
        });
        setActiveDeletingId(null);
        return;
      }

      showToast({
        variant: "success",
        title: "Document deleted",
      });
      router.refresh();
      setActiveDeletingId(null);
    });
  }

  function handleDeleteRequest(document: { id: string; name: string }) {
    setDeleteCandidate(document);
    setDeleteUsage(null);
    setIsLoadingDeleteUsage(true);

    startDeleting(async () => {
      const usageResult = await getDocumentLinkUsage(document.id);

      if (!usageResult.success || !usageResult.data) {
        showToast({
          variant: "error",
          title: "Could not check document usage",
          description: usageResult.error ?? "Try again.",
        });
        setDeleteCandidate(null);
        setIsLoadingDeleteUsage(false);
        return;
      }

      setDeleteUsage(usageResult.data);
      setIsLoadingDeleteUsage(false);
    });
  }

  function handleHardDelete(documentId: string) {
    setActiveDeletingId(documentId);

    startDeleting(async () => {
      const result = await hardDeleteStudentDocument(documentId);

      if (!result.success) {
        showToast({
          variant: "error",
          title: "Hard delete failed",
          description: result.error ?? "Failed to unlink and delete this document.",
        });
        setActiveDeletingId(null);
        return;
      }

      showToast({
        variant: "success",
        title: "Document deleted",
        description: "Links were removed and the file was deleted.",
      });

      setDeleteCandidate(null);
      setDeleteUsage(null);
      setActiveDeletingId(null);
      router.refresh();
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

      {view === "ALL_FILES" ? (
        filteredDocuments.length ? (
          <section className="space-y-4">
            {filteredDocuments.map((document) => (
              <StudentDocumentCard
                key={document.id}
                document={document}
                onDeleteRequest={handleDeleteRequest}
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
          {filteredRequirements.map(({ requirement, effectiveStatus }) => (
            <StudentRequiredDocumentCard
              key={requirement.id}
              requirement={requirement}
              linkedDocument={requiredLinkMap[requirement.id] ?? null}
              effectiveStatus={effectiveStatus}
              onChooseDocument={setPickerRequirement}
              onUnlinkDocument={(selectedRequirement) => {
                startLinking(async () => {
                  const result = await removeDocumentLink(
                    "REQUIRED_DOCUMENT",
                    selectedRequirement.id,
                  );

                  if (!result.success) {
                    showToast({
                      variant: "error",
                      title: "Unlink failed",
                      description: result.error ?? "Failed to unlink required document.",
                    });
                    return;
                  }

                  showToast({
                    variant: "success",
                    title: "Document unlinked",
                  });
                  router.refresh();
                });
              }}
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
        onSelect={(document) => {
          if (!pickerRequirement) {
            return;
          }
          const selectedRequirement = pickerRequirement;

          startLinking(async () => {
            const result = await setRequiredDocumentLink(selectedRequirement.id, document.id);

            if (!result.success) {
              showToast({
                variant: "error",
                title: "Link failed",
                description: result.error ?? "Failed to link required document.",
              });
              return;
            }

            showToast({
              variant: "success",
              title: "Document linked",
              description: `${document.name} linked to ${selectedRequirement.label}.`,
            });
            setPickerRequirement(null);
            router.refresh();
          });
        }}
      />

      <StudentDocumentDeleteModal
        open={Boolean(deleteCandidate)}
        documentName={deleteCandidate?.name ?? ""}
        usage={deleteUsage}
        isLoadingUsage={isLoadingDeleteUsage}
        isSubmitting={deletingId && activeDeletingId === deleteCandidate?.id}
        onClose={() => {
          if (deletingId) {
            return;
          }

          setDeleteCandidate(null);
          setDeleteUsage(null);
          setIsLoadingDeleteUsage(false);
        }}
        onDelete={() => {
          if (!deleteCandidate) {
            return;
          }

          handleDelete(deleteCandidate.id);
          setDeleteCandidate(null);
          setDeleteUsage(null);
        }}
        onHardDelete={() => {
          if (!deleteCandidate) {
            return;
          }

          handleHardDelete(deleteCandidate.id);
        }}
      />
    </div>
  );
}

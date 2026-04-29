// /src/components/dashboard/student/StudentDocumentVault.tsx
"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
// NOTE: You will need to update this action to just run `prisma.document.delete()`
import { deleteStudentDocument } from "@/actions/documents";
import { useToast } from "@/components/common/feedback/ToastProvider";
import StudentDocumentDeleteModal from "@/components/dashboard/student/StudentDocumentDeleteModal";
import { cn } from "@/lib/utils";

import StudentDocumentCard from "./StudentDocumentCard";
import StudentDocumentToolbar, { type StudentDocumentFilter } from "./StudentDocumentToolbar";
import StudentRequiredDocumentCard from "./StudentRequiredDocumentCard";

type StudentDocumentVaultProps = {
  documents: any[];
  requirements: any[];
};

type VaultView = "ALL_FILES" | "REQUIRED_DOCUMENTS";

export default function StudentDocumentVault({
  documents,
  requirements,
}: StudentDocumentVaultProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<StudentDocumentFilter>("ALL");
  const [view, setView] = useState<VaultView>("ALL_FILES");

  const [deletingId, startDeleting] = useTransition();
  const [deleteCandidate, setDeleteCandidate] = useState<{ id: string; name: string } | null>(null);

  const { showToast } = useToast();

  // Filter Documents for "All Files" View
  const filteredDocuments = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return documents.filter((document) => {
      const matchesFilter = filter === "ALL" || document.status === filter;
      const searchableText = `${document.name} ${document.type} ${document.status} ${document.notes ?? ""}`.toLowerCase();
      const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);
      return matchesFilter && matchesQuery;
    });
  }, [documents, filter, query]);

  // Filter Requirements for "Required Documents" View
  const filteredRequirements = useMemo(() => {
    if (filter === "ALL") return requirements;
    return requirements.filter((req) => req.status === filter);
  }, [filter, requirements]);

  // Simple, clean delete function
  function handleDelete(documentId: string) {
    startDeleting(async () => {
      const result = await deleteStudentDocument(documentId);
      if (!result.success) {
        showToast({
          variant: "error",
          title: "Delete failed",
          description: result.error ?? "Failed to delete the document.",
        });
        return;
      }
      showToast({ variant: "success", title: "Document deleted" });
      setDeleteCandidate(null);
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
            view === "ALL_FILES" ? "bg-primary text-white" : "text-slate-500 hover:text-slate-900",
          )}
        >
          All Files
        </button>
        <button
          type="button"
          onClick={() => setView("REQUIRED_DOCUMENTS")}
          className={cn(
            "rounded-[0.9rem] px-4 py-2.5 font-inter text-sm font-semibold transition",
            view === "REQUIRED_DOCUMENTS" ? "bg-primary text-white" : "text-slate-500 hover:text-slate-900",
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
                onDeleteRequest={(doc) => setDeleteCandidate(doc)}
                isDeleting={deletingId && deleteCandidate?.id === document.id}
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
              // Because of the 1:M schema, we just pass the first attached document
              linkedDocument={requirement.documents?.[0] ?? null}
              effectiveStatus={requirement.status}

              // Linking/Unlinking is now handled natively by the Upload/Delete flows
              onSelectDocument={() => { }}
              onUnlinkDocument={() => {
                if (requirement.documents?.[0]) {
                  setDeleteCandidate({ id: requirement.documents[0].id, name: requirement.documents[0].name });
                }
              }}
              disabled={deletingId}
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

      {/* Simplified Delete Modal */}
      <StudentDocumentDeleteModal
        open={Boolean(deleteCandidate)}
        documentName={deleteCandidate?.name ?? ""}
        usage={null} // Usage checks are dead, documents are directly owned!
        isLoadingUsage={false}
        isSubmitting={deletingId}
        onClose={() => !deletingId && setDeleteCandidate(null)}
        onDelete={() => deleteCandidate && handleDelete(deleteCandidate.id)}
        onHardDelete={() => deleteCandidate && handleDelete(deleteCandidate.id)}
      />
    </div>
  );
}

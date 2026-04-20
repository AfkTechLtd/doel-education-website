"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { removeDocumentLink, setApplicationFieldDocumentLink } from "@/actions/documents";
import DocumentAttachmentField from "@/components/common/documents/DocumentAttachmentField";
import DocumentPickerModal from "@/components/common/documents/DocumentPickerModal";
import { useToast } from "@/components/common/feedback/ToastProvider";
import DashboardPageHeader from "@/components/dashboard/shared/DashboardPageHeader";
import type { ApplicationFieldDocumentLinkItem, SelectedDocumentReference } from "@/lib/documents/types";

const SOP_CONTEXT_KEY = "SECTION_9:SOP_FILE";

type StudentApplicationPageContentProps = {
  links: ApplicationFieldDocumentLinkItem[];
};

export default function StudentApplicationPageContent({
  links,
}: StudentApplicationPageContentProps) {
  const router = useRouter();
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isLinking, startLinking] = useTransition();
  const { showToast } = useToast();

  const sopDocument = useMemo(() => {
    return links.find((link) => link.contextKey === SOP_CONTEXT_KEY)?.document ?? null;
  }, [links]);

  function handleSelectDocument(document: SelectedDocumentReference) {
    startLinking(async () => {
      const result = await setApplicationFieldDocumentLink(SOP_CONTEXT_KEY, document.id);

      if (!result.success) {
        showToast({
          variant: "error",
          title: "Link failed",
          description: result.error ?? "Failed to link SOP document.",
        });
        return;
      }

      showToast({
        variant: "success",
        title: "SOP document linked",
        description: document.name,
      });
      setIsPickerOpen(false);
      router.refresh();
    });
  }

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Student Application"
        title="My Application"
        description="Manage your key application documents and attach vault files to the correct application fields."
      />

      <section className="rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
        <div>
          <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Section 9
          </p>
          <h2 className="mt-2 font-poppins text-2xl font-semibold text-slate-900">
            Statement of Purpose Document
          </h2>
          <p className="mt-2 max-w-2xl font-inter text-sm leading-relaxed text-slate-500">
            Select your SOP from the vault or upload a new one. The selected document is saved for this application field.
          </p>
        </div>

        <DocumentAttachmentField
          linkedDocument={sopDocument}
          status={sopDocument?.status ?? "PENDING"}
          helperText="Attach the SOP file used for this application section."
          onChoose={() => setIsPickerOpen(true)}
          onUnlink={() => {
            startLinking(async () => {
              const result = await removeDocumentLink("APPLICATION_FIELD", SOP_CONTEXT_KEY);

              if (!result.success) {
                showToast({
                  variant: "error",
                  title: "Unlink failed",
                  description: result.error ?? "Failed to unlink SOP document.",
                });
                return;
              }

              showToast({
                variant: "success",
                title: "SOP document unlinked",
              });
              router.refresh();
            });
          }}
          disabled={isLinking}
        />
      </section>

      <DocumentPickerModal
        open={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        title="Choose SOP Document"
        onSelect={handleSelectDocument}
      />
    </div>
  );
}

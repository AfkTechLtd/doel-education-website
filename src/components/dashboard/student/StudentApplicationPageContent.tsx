"use client";

import { useMemo, useTransition } from "react";
import { useRouter } from "next/navigation";
import { removeDocumentLink, setApplicationFieldDocumentLink } from "@/actions/documents";
import DocumentInputField from "@/components/common/documents/DocumentInputField";
import { useToast } from "@/components/common/feedback/ToastProvider";
import DashboardPageHeader from "@/components/dashboard/shared/DashboardPageHeader";
import type { ApplicationFieldDocumentLinkItem, SelectedDocumentReference } from "@/lib/documents/types";

const SOP_CONTEXT_KEY = "SECTION_9:SOP_FILE";

function buildDebugHint(contextKey: string, documentId?: string) {
  if (process.env.NODE_ENV !== "development") {
    return undefined;
  }

  return `[APPLICATION_FIELD/${contextKey}${documentId ? ` | doc: ${documentId}` : ""}]`;
}

type StudentApplicationPageContentProps = {
  links: ApplicationFieldDocumentLinkItem[];
};

export default function StudentApplicationPageContent({
  links,
}: StudentApplicationPageContentProps) {
  const router = useRouter();
  const [isLinking, startLinking] = useTransition();
  const { showToast } = useToast();

  const sopDocument = useMemo(() => {
    return links.find((link) => link.contextKey === SOP_CONTEXT_KEY)?.document ?? null;
  }, [links]);

  function handleSelectDocument(document: SelectedDocumentReference) {
    if (!document?.id) {
      showToast({
        variant: "error",
        title: "Could not link SOP document",
        description: [
          "Selected document is missing.",
          buildDebugHint(SOP_CONTEXT_KEY),
        ]
          .filter(Boolean)
          .join(" "),
      });
      return;
    }

    startLinking(async () => {
      const result = await setApplicationFieldDocumentLink(SOP_CONTEXT_KEY, document.id);

      if (!result.success) {
        showToast({
          variant: "error",
          title: "Could not link SOP document",
          description: [
            result.error ?? "Failed to link SOP document.",
            buildDebugHint(SOP_CONTEXT_KEY, document.id),
          ]
            .filter(Boolean)
            .join(" "),
        });
        return;
      }

      showToast({
        variant: "success",
        title: "SOP document linked",
        description: document.name,
      });
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
        <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
          Section 9
        </p>

        <DocumentInputField
          label="Statement of Purpose Document"
          description="Select your SOP from the vault or upload a new one. The selected document is saved for this application field."
          linkedDocument={sopDocument}
          status={sopDocument?.status ?? "PENDING"}
          pickerTitle="Choose SOP Document"
          onUnlink={() => {
            return new Promise<void>((resolve) => {
              startLinking(async () => {
                const result = await removeDocumentLink("APPLICATION_FIELD", SOP_CONTEXT_KEY);

                if (!result.success) {
                  showToast({
                    variant: "error",
                    title: "Could not unlink SOP document",
                    description: [
                      result.error ?? "Failed to unlink SOP document.",
                      buildDebugHint(SOP_CONTEXT_KEY),
                    ]
                      .filter(Boolean)
                      .join(" "),
                  });
                  resolve();
                  return;
                }

                showToast({
                  variant: "success",
                  title: "SOP document unlinked",
                });
                router.refresh();
                resolve();
              });
            });
          }}
          onSelect={handleSelectDocument}
          disabled={isLinking}
        />
      </section>
    </div>
  );
}

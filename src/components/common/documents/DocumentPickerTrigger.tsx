"use client";

import { cloneElement, isValidElement, useState } from "react";
import type { ReactElement } from "react";
import type {
  DocumentUploadConfig,
  SelectedDocumentReference,
} from "@/lib/documents/types";
import DocumentPickerModal from "./DocumentPickerModal";

type TriggerChildProps = {
  onClick?: () => void;
};

type DocumentPickerTriggerProps = {
  title?: string;
  uploadConfig?: DocumentUploadConfig;
  onSelect: (document: SelectedDocumentReference) => void | Promise<void>;
  children: ReactElement<TriggerChildProps>;
};

/**
 * Reusable callback-based launcher for the shared document picker.
 *
 * Wrap any custom button or trigger element with this component when you want
 * to open the current document picker modal and receive the selected document
 * details in a callback.
 */
export default function DocumentPickerTrigger({
  title,
  uploadConfig,
  onSelect,
  children,
}: DocumentPickerTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!isValidElement(children)) {
    throw new Error(
      "DocumentPickerTrigger expects a single React element child.",
    );
  }

  const originalOnClick = children.props.onClick;

  return (
    <>
      {cloneElement(children, {
        onClick: () => {
          originalOnClick?.();
          setIsOpen(true);
        },
      })}

      <DocumentPickerModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        uploadConfig={uploadConfig}
        onSelect={async (document) => {
          await onSelect(document);
        }}
      />
    </>
  );
}

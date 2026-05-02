"use client";

import { getFileKey } from "@/lib/documents/upload-helpers";
import type { RequirementWithDocuments } from "@/lib/documents/types";
import SelectedFileItem from "../upload/SelectedFileItem";

type SelectedFilesListProps = {
  files: File[];
  fileRequirementMap: Record<string, string>;
  requirements: RequirementWithDocuments[];
  fulfilledRequirementIds: Set<string>;
  selectedRequirementIds: Set<string>;
  isRequirementScopedUpload: boolean;
  targetRequirementId?: string;
  onRequirementChange: (fileKey: string, requirementId: string) => void;
  onRemove: (file: File) => void;
};

/**
 * Renders the list of selected files with requirement assignment controls.
 *
 * In scoped mode the requirement selector is hidden and replaced with a
 * fixed label so the student knows exactly which requirement the file will
 * be linked to.
 */
export default function SelectedFilesList({
  files,
  fileRequirementMap,
  requirements,
  fulfilledRequirementIds,
  selectedRequirementIds,
  isRequirementScopedUpload,
  targetRequirementId,
  onRequirementChange,
  onRemove,
}: SelectedFilesListProps) {
  return (
    <div className="space-y-3 rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="font-poppins text-lg font-semibold text-slate-900">Selected Files</p>
        <p className="font-inter text-sm text-slate-400">
          {files.length} {files.length === 1 ? "file" : "files"}
        </p>
      </div>
      <div className="max-h-60 space-y-3 overflow-y-auto pr-1">
        {files.map((file) => (
          <SelectedFileItem
            key={getFileKey(file)}
            file={file}
            chosenRequirementId={
              isRequirementScopedUpload
                ? targetRequirementId
                : fileRequirementMap[getFileKey(file)]
            }
            requirements={requirements}
            fulfilledRequirementIds={fulfilledRequirementIds}
            selectedRequirementIds={selectedRequirementIds}
            hideRequirementSelect={isRequirementScopedUpload}
            fixedRequirementLabel={
              isRequirementScopedUpload
                ? (requirements.find((r) => r.id === targetRequirementId)?.name ?? "Selected requirement")
                : undefined
            }
            onRequirementChange={onRequirementChange}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
}

import { buildStudentDocumentStoragePath, inferDocumentType } from "@/lib/documents/paths";
import { STORAGE_BUCKETS } from "@/lib/constants";
import { createClient as createSupabaseBrowserClient } from "@/lib/supabase/client";
import { finalizeStudentDocumentUploadViaApi } from "@/lib/documents/api-client";
import { getFileKey } from "@/lib/documents/upload-helpers";
import type {
  FileRequirementMap,
  SelectedDocumentReference,
} from "@/lib/documents/types";

type PerformDocumentUploadsInput = {
  files: File[];
  fileRequirementMap: FileRequirementMap;
  isRequirementScopedUpload: boolean;
  targetRequirementId?: string;
};

type PerformDocumentUploadsResult = {
  successfulUploads: SelectedDocumentReference[];
  failedUploads: string[];
  failedFileKeys: Set<string>;
  /** Present when the user is not authenticated and the loop cannot start. */
  authError?: string;
};

/**
 * Orchestrates browser-side upload for a batch of selected files.
 *
 * Steps for each file:
 *   1. Build the Supabase storage path.
 *   2. Upload raw bytes to Supabase Storage.
 *   3. Call `/api/documents/finalize-upload` to persist the DB row.
 *   4. On DB failure, roll back by removing the orphaned storage object.
 *
 * @returns Aggregated results so the caller can decide what to toast and which
 * files to keep in the UI.
 */
export async function performDocumentUploads(
  input: PerformDocumentUploadsInput,
): Promise<PerformDocumentUploadsResult> {
  const supabase = createSupabaseBrowserClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      successfulUploads: [],
      failedUploads: ["You must be signed in to upload documents."],
      failedFileKeys: new Set(),
      authError: "You must be signed in to upload documents.",
    };
  }

  const successfulUploads: SelectedDocumentReference[] = [];
  const failedUploads: string[] = [];
  const failedFileKeys = new Set<string>();

  for (const file of input.files) {
    const fileKey = getFileKey(file);
    const requirementId = input.isRequirementScopedUpload
      ? input.targetRequirementId
      : input.fileRequirementMap[fileKey];

    if (!requirementId) {
      failedUploads.push(`${file.name}: No requirement selected.`);
      failedFileKeys.add(fileKey);
      continue;
    }

    const documentId = crypto.randomUUID();
    const storagePath = buildStudentDocumentStoragePath(user.id, documentId, file.name);

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKETS.DOCUMENTS)
      .upload(storagePath, file, { upsert: false });

    if (uploadError) {
      failedUploads.push(`${file.name}: ${uploadError.message}`);
      failedFileKeys.add(fileKey);
      continue;
    }

    const documentResult = await finalizeStudentDocumentUploadViaApi({
      id: documentId,
      requirementId,
      name: file.name,
      type: inferDocumentType(file.name, file.type),
      bucket: STORAGE_BUCKETS.DOCUMENTS,
      storagePath,
      mimeType: file.type || null,
      sizeBytes: file.size,
      source: "VAULT_UPLOAD",
    });

    if (!documentResult.success || !documentResult.data) {
      failedUploads.push(
        documentResult.error ?? `${file.name}: Failed to save the uploaded document.`,
      );
      failedFileKeys.add(fileKey);

      // Rollback: remove the orphaned storage object so we don't leak data.
      await supabase.storage.from(STORAGE_BUCKETS.DOCUMENTS).remove([storagePath]);
      continue;
    }

    successfulUploads.push(documentResult.data);
  }

  return { successfulUploads, failedUploads, failedFileKeys };
}

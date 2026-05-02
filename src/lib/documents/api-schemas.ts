import { z } from "zod";
import type {
  FinalizeDocumentUploadPayload,
  DeleteDocumentPayload,
  HardDeleteDocumentPayload,
} from "@/lib/documents/contracts";

/**
 * Validates the payload for `/api/documents/finalize-upload`.
 *
 * Every field is required so a stale or partial payload cannot create an
 * incomplete `Document` row.  Optional fields accept `null` for type safety.
 */
export const finalizeDocumentUploadSchema: z.ZodType<FinalizeDocumentUploadPayload> =
  z.object({
    id: z.string().trim().min(1),
    name: z.string().trim().min(1),
    type: z.string().trim().min(1),
    requirementId: z.string().trim().min(1),
    bucket: z.string().trim().min(1).nullable().optional(),
    storagePath: z.string().trim().min(1).nullable().optional(),
    mimeType: z.string().trim().min(1).nullable().optional(),
    sizeBytes: z.number().int().nonnegative().nullable().optional(),
    source: z.string().trim().min(1).nullable().optional(),
  });

/**
 * Validates the payload for `/api/documents/delete`.
 */
export const deleteDocumentSchema: z.ZodType<DeleteDocumentPayload> = z.object({
  documentId: z.string().trim().min(1),
});

/**
 * Validates the payload for `/api/documents/hard-delete`.
 */
export const hardDeleteDocumentSchema: z.ZodType<HardDeleteDocumentPayload> =
  z.object({
    documentId: z.string().trim().min(1),
  });

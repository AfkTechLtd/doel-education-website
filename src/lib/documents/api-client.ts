import type {
  ActionResult,
  FinalizeDocumentUploadPayload,
  DeleteDocumentPayload,
  HardDeleteDocumentPayload,
  FinalizeDocumentUploadResult,
  DeleteDocumentResult,
  HardDeleteDocumentResult,
} from "@/lib/documents/contracts";

/**
 * Shared fetch helper for the `/api/documents/*` endpoints.
 *
 * Enforces:
 *   - `Content-Type: application/json`
 *   - Non-cached requests (important for mutations)
 *   - Graceful fallback when the response body is not JSON.
 */
async function postDocumentsApi<TRequest, TResponse>(
  url: string,
  payload: TRequest,
): Promise<ActionResult<TResponse>> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify(payload),
    });

    let body: ActionResult<TResponse> | null = null;
    try {
      body = await response.json();
    } catch {
      // Non-JSON response — fall through to generic error below.
    }

    if (!response.ok || !body) {
      return {
        success: false,
        error:
          body?.error ??
          `Request failed with status ${response.status}.`,
      };
    }

    return body;
  } catch (networkError) {
    console.error("[api-client:postDocumentsApi]", networkError);
    return { success: false, error: "Network error. Please try again." };
  }
}

/**
 * Finalizes a storage upload into a persistent `Document` record.
 *
 * The client must already have uploaded the raw bytes to Supabase Storage;
 * this call persists the metadata in Prisma.
 */
export function finalizeStudentDocumentUploadViaApi(
  payload: FinalizeDocumentUploadPayload,
): Promise<ActionResult<FinalizeDocumentUploadResult>> {
  return postDocumentsApi("/api/documents/finalize-upload", payload);
}

/**
 * Soft-deletes a document row if it is not linked to any application context.
 */
export function deleteStudentDocumentViaApi(
  payload: DeleteDocumentPayload,
): Promise<ActionResult<DeleteDocumentResult>> {
  return postDocumentsApi("/api/documents/delete", payload);
}

/**
 * Hard-deletes a document row and **all** associated `DocumentLink` rows.
 */
export function hardDeleteStudentDocumentViaApi(
  payload: HardDeleteDocumentPayload,
): Promise<ActionResult<HardDeleteDocumentResult>> {
  return postDocumentsApi("/api/documents/hard-delete", payload);
}

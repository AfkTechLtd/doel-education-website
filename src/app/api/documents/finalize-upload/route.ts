import { NextResponse } from "next/server";
import { finalizeDocumentUploadSchema } from "@/lib/documents/api-schemas";
import { getApiStudentContext } from "@/lib/documents/api-auth";
import { finalizeStudentDocumentUpload } from "@/lib/documents/mutations";
import type { ActionResult } from "@/lib/documents/contracts";
import type { FinalizeDocumentUploadResult } from "@/lib/documents/contracts";

/**
 * POST /api/documents/finalize-upload
 *
 * Converts a raw Supabase Storage upload into a persisted `Document` row.
 *
 * Ownership check:
 *   1. Resolve the student from the current session.
 *   2. Verify the supplied `requirementId` belongs to that student.
 *
 * Returns `{ success, error?, data? }` so the client can show a toast and
 * refresh the vault list without caring about HTTP status nuances.
 */
export async function POST(request: Request) {
  try {
    const auth = await getApiStudentContext();
    if (!auth.success || !auth.data) {
      return NextResponse.json(auth as ActionResult<never>, {
        status: 401,
      });
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON body." } as ActionResult<never>,
        { status: 400 },
      );
    }

    const parsed = finalizeDocumentUploadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid request payload." } as ActionResult<never>,
        { status: 400 },
      );
    }

    const result = await finalizeStudentDocumentUpload(
      auth.data.studentProfileId,
      parsed.data,
    );

    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (error) {
    console.error("[api:finalize-upload]", error);
    return NextResponse.json(
      { success: false, error: "Failed to finalize upload." } as ActionResult<never>,
      { status: 500 },
    );
  }
}

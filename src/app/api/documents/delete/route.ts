import { NextResponse } from "next/server";
import { deleteDocumentSchema } from "@/lib/documents/api-schemas";
import { getApiStudentContext } from "@/lib/documents/api-auth";
import { deleteStudentDocument } from "@/lib/documents/mutations";
import type { ActionResult } from "@/lib/documents/contracts";

/**
 * POST /api/documents/delete
 *
 * Soft-deletes a single document row after verifying ownership and ensuring
 * the document is not linked to any application context (`DocumentLink`).
 *
 * On success the client should toast "Document deleted" and refresh the vault.
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

    const parsed = deleteDocumentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid request payload." } as ActionResult<never>,
        { status: 400 },
      );
    }

    const result = await deleteStudentDocument(
      auth.data.studentProfileId,
      parsed.data.documentId,
    );

    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (error) {
    console.error("[api:delete]", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete the document." } as ActionResult<never>,
      { status: 500 },
    );
  }
}

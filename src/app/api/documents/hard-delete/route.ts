import { NextResponse } from "next/server";
import { hardDeleteDocumentSchema } from "@/lib/documents/api-schemas";
import { getApiStudentContext } from "@/lib/documents/api-auth";
import { hardDeleteStudentDocument } from "@/lib/documents/mutations";
import type { ActionResult } from "@/lib/documents/contracts";

/**
 * POST /api/documents/hard-delete
 *
 * Permanently removes a document row, its storage object, and **all**
 * associated `DocumentLink` rows for the current student.
 *
 * This is the escape hatch when a document is actively linked to application
 * fields or resource templates and the user explicitly wants to unlink + delete.
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

    const parsed = hardDeleteDocumentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid request payload." } as ActionResult<never>,
        { status: 400 },
      );
    }

    const result = await hardDeleteStudentDocument(
      auth.data.studentProfileId,
      parsed.data.documentId,
    );

    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (error) {
    console.error("[api:hard-delete]", error);
    return NextResponse.json(
      { success: false, error: "Failed to hard delete the document." } as ActionResult<never>,
      { status: 500 },
    );
  }
}

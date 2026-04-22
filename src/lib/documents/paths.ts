/**
 * Produces a storage-safe filename segment for Supabase Storage paths.
 */
function sanitizeFileName(fileName: string) {
  return fileName
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "");
}

/**
 * Builds the canonical Supabase Storage path for a student-owned document.
 *
 * The path is keyed by Supabase auth user id because storage RLS policies are
 * evaluated against `auth.uid()` rather than Prisma's `StudentProfile.id`.
 */
export function buildStudentDocumentStoragePath(
  supabaseUserId: string,
  documentId: string,
  fileName: string,
) {
  const safeFileName = sanitizeFileName(fileName) || "document";
  return `students/${supabaseUserId}/${documentId}/${safeFileName}`;
}

/**
 * Infers a coarse document type from the uploaded filename and MIME type.
 * This keeps the picker and vault readable before richer admin-side metadata is
 * introduced.
 */
export function inferDocumentType(fileName: string, mimeType?: string | null) {
  const normalized = fileName.toLowerCase();

  if (normalized.includes("passport")) return "Passport";
  if (normalized.includes("transcript")) return "Academic Transcript";
  if (normalized.includes("sop") || normalized.includes("statement-of-purpose")) {
    return "Statement of Purpose";
  }
  if (normalized.includes("lor") || normalized.includes("recommendation")) {
    return "Letter of Recommendation";
  }
  if (normalized.includes("affidavit")) return "Affidavit of Support";
  if (normalized.includes("bank") || normalized.includes("financial")) {
    return "Financial Statement";
  }
  if (mimeType?.startsWith("image/")) return "Image Document";
  if (mimeType === "application/pdf") return "PDF Document";

  return "General Document";
}

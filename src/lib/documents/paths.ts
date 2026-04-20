function sanitizeFileName(fileName: string) {
  return fileName
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "");
}

export function buildStudentDocumentStoragePath(
  supabaseUserId: string,
  documentId: string,
  fileName: string,
) {
  const safeFileName = sanitizeFileName(fileName) || "document";
  return `students/${supabaseUserId}/${documentId}/${safeFileName}`;
}

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

export type StudentDocumentStatus =
  | "PENDING"
  | "UNDER_REVIEW"
  | "RECEIVED"
  | "VERIFIED"
  | "REJECTED"
  | "WAIVED";

export type StudentDocumentMatchState = "MATCHED" | "UNASSIGNED";

export type LocalStudentDocument = {
  id: string;
  studentId: string;
  name: string;
  type: string;
  status: StudentDocumentStatus;
  matchState: StudentDocumentMatchState;
  matchedLabel: string | null;
  storagePath: string | null;
  storageUrl: string | null;
  bucket: string | null;
  mimeType: string | null;
  sizeBytes: number | null;
  notes: string | null;
  uploadedAt: string | null;
  verifiedAt: string | null;
  verifiedBy: string | null;
  createdAt: string;
  updatedAt: string;
};

export const studentDocuments: LocalStudentDocument[] = [
  {
    id: "passport-pdf",
    studentId: "student-demo",
    name: "passport.pdf",
    type: "Passport",
    status: "VERIFIED",
    matchState: "MATCHED",
    matchedLabel: "Matched to Passport",
    storagePath: null,
    storageUrl: null,
    bucket: "documents",
    mimeType: "application/pdf",
    sizeBytes: 284000,
    notes: null,
    uploadedAt: "2026-04-18T10:00:00.000Z",
    verifiedAt: "2026-04-19T09:30:00.000Z",
    verifiedBy: "Counselor User",
    createdAt: "2026-04-18T10:00:00.000Z",
    updatedAt: "2026-04-19T09:30:00.000Z",
  },
  {
    id: "academic-transcript-pdf",
    studentId: "student-demo",
    name: "academic_transcript.pdf",
    type: "Academic Transcript",
    status: "UNDER_REVIEW",
    matchState: "MATCHED",
    matchedLabel: "Matched to Academic Transcript",
    storagePath: null,
    storageUrl: null,
    bucket: "documents",
    mimeType: "application/pdf",
    sizeBytes: 512000,
    notes: "Counselor is reviewing page clarity and seals.",
    uploadedAt: "2026-04-19T08:20:00.000Z",
    verifiedAt: null,
    verifiedBy: null,
    createdAt: "2026-04-19T08:20:00.000Z",
    updatedAt: "2026-04-19T08:20:00.000Z",
  },
  {
    id: "research-focused-sop-docx",
    studentId: "student-demo",
    name: "research-focused-sop.docx",
    type: "Statement of Purpose",
    status: "PENDING",
    matchState: "MATCHED",
    matchedLabel: "Matched to Statement of Purpose",
    storagePath: null,
    storageUrl: null,
    bucket: "sop",
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    sizeBytes: 96000,
    notes: null,
    uploadedAt: "2026-04-19T11:45:00.000Z",
    verifiedAt: null,
    verifiedBy: null,
    createdAt: "2026-04-19T11:45:00.000Z",
    updatedAt: "2026-04-19T11:45:00.000Z",
  },
  {
    id: "lor-1-pdf",
    studentId: "student-demo",
    name: "lor_1.pdf",
    type: "Letter of Recommendation",
    status: "REJECTED",
    matchState: "MATCHED",
    matchedLabel: "Matched to LOR 1",
    storagePath: null,
    storageUrl: null,
    bucket: "lor",
    mimeType: "application/pdf",
    sizeBytes: 176000,
    notes: "Please upload a signed version on official letterhead.",
    uploadedAt: "2026-04-17T14:15:00.000Z",
    verifiedAt: null,
    verifiedBy: null,
    createdAt: "2026-04-17T14:15:00.000Z",
    updatedAt: "2026-04-18T07:10:00.000Z",
  },
  {
    id: "extra-bank-statement-pdf",
    studentId: "student-demo",
    name: "bank_statement_april.pdf",
    type: "Financial Statement",
    status: "RECEIVED",
    matchState: "UNASSIGNED",
    matchedLabel: null,
    storagePath: null,
    storageUrl: null,
    bucket: "documents",
    mimeType: "application/pdf",
    sizeBytes: 438000,
    notes: null,
    uploadedAt: "2026-04-19T12:15:00.000Z",
    verifiedAt: null,
    verifiedBy: null,
    createdAt: "2026-04-19T12:15:00.000Z",
    updatedAt: "2026-04-19T12:15:00.000Z",
  },
  {
    id: "affidavit-support-pdf",
    studentId: "student-demo",
    name: "affidavit_of_support.pdf",
    type: "Affidavit of Support",
    status: "WAIVED",
    matchState: "MATCHED",
    matchedLabel: "Waived by counselor",
    storagePath: null,
    storageUrl: null,
    bucket: "general",
    mimeType: "application/pdf",
    sizeBytes: 221000,
    notes: "Waived for current application set.",
    uploadedAt: "2026-04-16T13:45:00.000Z",
    verifiedAt: null,
    verifiedBy: null,
    createdAt: "2026-04-16T13:45:00.000Z",
    updatedAt: "2026-04-18T09:00:00.000Z",
  },
];

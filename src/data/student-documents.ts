// /src/data/student-documents.ts

export type LocalStudentDocument = {
  id: string;
  studentId: string;
  requirementId: string; // The strict DB relational link
  name: string;
  type: string;
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
    requirementId: "passport",
    name: "passport.pdf",
    type: "Passport",
    storagePath: null, storageUrl: null, bucket: "documents", mimeType: "application/pdf", sizeBytes: 284000,
    notes: null,
    uploadedAt: "2026-04-18T10:00:00.000Z", verifiedAt: "2026-04-19T09:30:00.000Z", verifiedBy: "Counselor User",
    createdAt: "2026-04-18T10:00:00.000Z", updatedAt: "2026-04-19T09:30:00.000Z",
  },
  {
    id: "academic-transcript-pdf",
    studentId: "student-demo",
    requirementId: "academic-transcript",
    name: "academic_transcript.pdf",
    type: "Academic Transcript",
    storagePath: null, storageUrl: null, bucket: "documents", mimeType: "application/pdf", sizeBytes: 512000,
    notes: "Counselor is reviewing page clarity and seals.",
    uploadedAt: "2026-04-19T08:20:00.000Z", verifiedAt: null, verifiedBy: null,
    createdAt: "2026-04-19T08:20:00.000Z", updatedAt: "2026-04-19T08:20:00.000Z",
  },
  {
    id: "research-focused-sop-docx",
    studentId: "student-demo",
    requirementId: "statement-of-purpose",
    name: "research-focused-sop.docx",
    type: "Statement of Purpose",
    storagePath: null, storageUrl: null, bucket: "sop", mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", sizeBytes: 96000,
    notes: null,
    uploadedAt: "2026-04-19T11:45:00.000Z", verifiedAt: null, verifiedBy: null,
    createdAt: "2026-04-19T11:45:00.000Z", updatedAt: "2026-04-19T11:45:00.000Z",
  },
  {
    id: "lor-1-pdf",
    studentId: "student-demo",
    requirementId: "lor-1",
    name: "lor_1.pdf",
    type: "Letter of Recommendation",
    storagePath: null, storageUrl: null, bucket: "lor", mimeType: "application/pdf", sizeBytes: 176000,
    notes: "Please upload a signed version on official letterhead.",
    uploadedAt: "2026-04-17T14:15:00.000Z", verifiedAt: null, verifiedBy: null,
    createdAt: "2026-04-17T14:15:00.000Z", updatedAt: "2026-04-18T07:10:00.000Z",
  },
  {
    id: "extra-bank-statement-pdf",
    studentId: "student-demo",
    requirementId: "financial-proof",
    name: "bank_statement_april.pdf",
    type: "Financial Statement",
    storagePath: null, storageUrl: null, bucket: "documents", mimeType: "application/pdf", sizeBytes: 438000,
    notes: null,
    uploadedAt: "2026-04-19T12:15:00.000Z", verifiedAt: null, verifiedBy: null,
    createdAt: "2026-04-19T12:15:00.000Z", updatedAt: "2026-04-19T12:15:00.000Z",
  },
];

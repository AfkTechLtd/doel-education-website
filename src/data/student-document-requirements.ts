import type { StudentDocumentStatus } from "./student-documents";

export type StudentRequirementStatus = StudentDocumentStatus | "STILL_NEEDED";

export type StudentDocumentRequirement = {
  id: string;
  label: string;
  type: string;
  status: StudentRequirementStatus;
  linkedFileName: string | null;
  helperText: string;
};

export const studentDocumentRequirements: StudentDocumentRequirement[] = [
  {
    id: "passport",
    label: "Passport",
    type: "Passport",
    status: "VERIFIED",
    linkedFileName: "passport.pdf",
    helperText: "Identity document is confirmed and ready for use.",
  },
  {
    id: "academic-transcript",
    label: "Academic Transcript",
    type: "Academic Transcript",
    status: "UNDER_REVIEW",
    linkedFileName: "academic_transcript.pdf",
    helperText: "Your transcript is currently being reviewed for completeness.",
  },
  {
    id: "statement-of-purpose",
    label: "Statement of Purpose",
    type: "Statement of Purpose",
    status: "PENDING",
    linkedFileName: "research-focused-sop.docx",
    helperText: "A draft is uploaded and waiting for counselor review.",
  },
  {
    id: "lor-1",
    label: "Letter of Recommendation 1",
    type: "Letter of Recommendation",
    status: "REJECTED",
    linkedFileName: "lor_1.pdf",
    helperText: "The uploaded letter needs a signed official version.",
  },
  {
    id: "financial-proof",
    label: "Financial Proof",
    type: "Financial Statement",
    status: "RECEIVED",
    linkedFileName: "bank_statement_april.pdf",
    helperText: "Received in the vault and waiting to be mapped to your file checklist.",
  },
  {
    id: "affidavit-support",
    label: "Affidavit of Support",
    type: "Affidavit of Support",
    status: "WAIVED",
    linkedFileName: "affidavit_of_support.pdf",
    helperText: "This requirement is currently waived for your application.",
  },
  {
    id: "ielts-score-report",
    label: "IELTS Score Report",
    type: "Test Score",
    status: "STILL_NEEDED",
    linkedFileName: null,
    helperText: "No file has been uploaded for this requirement yet.",
  },
];

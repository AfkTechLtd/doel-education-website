// /src/data/student-document-requirements.ts

// Strictly matches your Prisma DocumentStatus enum
export type DocumentStatus =
  | "PENDING"
  | "UNDER_REVIEW"
  | "RECEIVED"
  | "VERIFIED"
  | "REJECTED"
  | "WAIVED";

export type StudentDocumentRequirement = {
  id: string;           // Maps to DocumentRequirement.id
  name: string;         // Maps to DocumentRequirement.name
  description: string;  // Maps to DocumentRequirement.description
  status: DocumentStatus; // Status now correctly lives here!

  // Frontend UI Helpers
  linkedFileName: string | null;
  aliases: string[];
};

export const studentDocumentRequirements: StudentDocumentRequirement[] = [
  {
    id: "passport",
    name: "Passport",
    status: "VERIFIED",
    linkedFileName: "passport.pdf",
    description: "Upload a clear passport copy for verification.",
    aliases: ["passport", "passport_copy", "passport_scan"],
  },
  {
    id: "academic-transcript",
    name: "Academic Transcript",
    status: "UNDER_REVIEW",
    linkedFileName: "academic_transcript.pdf",
    description: "Upload your latest academic transcript document.",
    aliases: ["transcript", "academic_transcript", "marksheet"],
  },
  {
    id: "statement-of-purpose",
    name: "Statement of Purpose",
    status: "PENDING",
    linkedFileName: "research-focused-sop.docx",
    description: "Upload your SOP draft document for review.",
    aliases: ["sop", "statement_of_purpose", "personal_statement"],
  },
  {
    id: "lor-1",
    name: "Letter of Recommendation 1",
    status: "REJECTED",
    linkedFileName: "lor_1.pdf",
    description: "Upload the first signed recommendation letter.",
    aliases: ["lor_1", "lor1", "recommendation_1", "recommendation1"],
  },
  {
    id: "financial-proof",
    name: "Financial Proof",
    status: "RECEIVED",
    linkedFileName: "bank_statement_april.pdf",
    description: "Upload your financial proof or bank statement.",
    aliases: ["bank_statement", "financial_proof", "financial_statement", "bank"],
  },
  {
    id: "affidavit-support",
    name: "Affidavit of Support",
    status: "WAIVED",
    linkedFileName: null,
    description: "Upload your affidavit of support document if required.",
    aliases: ["affidavit", "affidavit_of_support", "sponsorship_affidavit"],
  },
  {
    id: "ielts-score-report",
    name: "IELTS Score Report",
    status: "PENDING",
    linkedFileName: null,
    description: "Upload your IELTS score report when available.",
    aliases: ["ielts", "ielts_report", "test_score"],
  },
];

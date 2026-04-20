import type { StudentDocumentStatus } from "@/lib/documents/types";

export type StudentRequirementStatus = StudentDocumentStatus | "STILL_NEEDED";

export type StudentDocumentRequirement = {
  id: string;
  label: string;
  type: string;
  status: StudentRequirementStatus;
  linkedFileName: string | null;
  helperText: string;
  aliases: string[];
  autoLinkEnabled?: boolean;
};

export const studentDocumentRequirements: StudentDocumentRequirement[] = [
  {
    id: "passport",
    label: "Passport",
    type: "Passport",
    status: "PENDING",
    linkedFileName: null,
    helperText: "Upload a clear passport copy for verification.",
    aliases: ["passport", "passport_copy", "passport_scan"],
  },
  {
    id: "academic-transcript",
    label: "Academic Transcript",
    type: "Academic Transcript",
    status: "PENDING",
    linkedFileName: null,
    helperText: "Upload your latest academic transcript document.",
    aliases: ["transcript", "academic_transcript", "marksheet"],
  },
  {
    id: "statement-of-purpose",
    label: "Statement of Purpose",
    type: "Statement of Purpose",
    status: "PENDING",
    linkedFileName: null,
    helperText: "Upload your SOP draft document for review.",
    aliases: ["sop", "statement_of_purpose", "personal_statement"],
  },
  {
    id: "lor-1",
    label: "Letter of Recommendation 1",
    type: "Letter of Recommendation",
    status: "PENDING",
    linkedFileName: null,
    helperText: "Upload the first signed recommendation letter.",
    aliases: ["lor_1", "lor1", "recommendation_1", "recommendation1"],
  },
  {
    id: "financial-proof",
    label: "Financial Proof",
    type: "Financial Statement",
    status: "PENDING",
    linkedFileName: null,
    helperText: "Upload your financial proof or bank statement.",
    aliases: ["bank_statement", "financial_proof", "financial_statement", "bank"],
  },
  {
    id: "affidavit-support",
    label: "Affidavit of Support",
    type: "Affidavit of Support",
    status: "PENDING",
    linkedFileName: null,
    helperText: "Upload your affidavit of support document if required.",
    aliases: ["affidavit", "affidavit_of_support", "sponsorship_affidavit"],
  },
  {
    id: "ielts-score-report",
    label: "IELTS Score Report",
    type: "Test Score",
    status: "PENDING",
    linkedFileName: null,
    helperText: "Upload your IELTS score report when available.",
    aliases: ["ielts", "ielts_report", "test_score"],
  },
];

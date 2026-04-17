// ============================================================
// Roles
// ============================================================

export const ROLES = {
  STUDENT: "STUDENT",
  COUNSELOR: "COUNSELOR",
  ADMIN: "ADMIN",
} as const;

export type RoleType = (typeof ROLES)[keyof typeof ROLES];

// ============================================================
// Application Statuses
// ============================================================

export const APPLICATION_STATUS = {
  NOT_STARTED: "NOT_STARTED",
  IN_PROGRESS: "IN_PROGRESS",
  UNDER_REVIEW: "UNDER_REVIEW",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  ON_HOLD: "ON_HOLD",
} as const;

export const APPLICATION_STATUS_LABELS: Record<string, string> = {
  NOT_STARTED: "Not Started",
  IN_PROGRESS: "In Progress",
  UNDER_REVIEW: "Under Review",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  ON_HOLD: "On Hold",
};

// ============================================================
// Document Statuses
// ============================================================

export const DOCUMENT_STATUS = {
  PENDING: "PENDING",
  UPLOADED: "UPLOADED",
  VERIFIED: "VERIFIED",
  REJECTED: "REJECTED",
} as const;

// ============================================================
// Application Section Numbers
// ============================================================

export const SECTION_NUMBERS = Array.from({ length: 14 }, (_, i) => `SECTION_${i + 1}`) as [
  "SECTION_1",
  "SECTION_2",
  "SECTION_3",
  "SECTION_4",
  "SECTION_5",
  "SECTION_6",
  "SECTION_7",
  "SECTION_8",
  "SECTION_9",
  "SECTION_10",
  "SECTION_11",
  "SECTION_12",
  "SECTION_13",
  "SECTION_14",
];

export const SECTION_LABELS: Record<string, string> = {
  SECTION_1: "Personal Information",
  SECTION_2: "Contact Details",
  SECTION_3: "Educational Background",
  SECTION_4: "Test Scores",
  SECTION_5: "Work Experience",
  SECTION_6: "Extracurricular Activities",
  SECTION_7: "Financial Information",
  SECTION_8: "Target Programs",
  SECTION_9: "Statement of Purpose",
  SECTION_10: "Letters of Recommendation",
  SECTION_11: "Passport & ID",
  SECTION_12: "Additional Documents",
  SECTION_13: "Visa Information",
  SECTION_14: "Review & Submit",
};

// ============================================================
// Notification Types
// ============================================================

export const NOTIFICATION_TYPE = {
  APPLICATION_UPDATE: "APPLICATION_UPDATE",
  DOCUMENT_REQUEST: "DOCUMENT_REQUEST",
  DOCUMENT_APPROVED: "DOCUMENT_APPROVED",
  DOCUMENT_REJECTED: "DOCUMENT_REJECTED",
  MESSAGE_RECEIVED: "MESSAGE_RECEIVED",
  COUNSELOR_ASSIGNED: "COUNSELOR_ASSIGNED",
  DEADLINE_REMINDER: "DEADLINE_REMINDER",
  SYSTEM: "SYSTEM",
} as const;

// ============================================================
// Counselor Note Stages
// ============================================================

export const COUNSELOR_NOTE_STAGE = {
  INITIAL_CONSULTATION: "INITIAL_CONSULTATION",
  DOCUMENT_COLLECTION: "DOCUMENT_COLLECTION",
  APPLICATION_PREP: "APPLICATION_PREP",
  SUBMISSION: "SUBMISSION",
  VISA_PREP: "VISA_PREP",
  POST_ADMISSION: "POST_ADMISSION",
  COMPLETED: "COMPLETED",
} as const;

// ============================================================
// Storage Buckets
// ============================================================

export const STORAGE_BUCKETS = {
  DOCUMENTS: process.env.SUPABASE_BUCKET_DOCUMENTS ?? "documents",
  SOP: process.env.SUPABASE_BUCKET_SOP ?? "sop",
  LOR: process.env.SUPABASE_BUCKET_LOR ?? "lor",
  GENERAL: process.env.SUPABASE_BUCKET_GENERAL ?? "general",
} as const;

// ============================================================
// Route constants
// ============================================================

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  STUDENT_DASHBOARD: "/student",
  COUNSELOR_DASHBOARD: "/counselor",
  ADMIN_DASHBOARD: "/admin",
} as const;

export const ROLE_DASHBOARD: Record<RoleType, string> = {
  STUDENT: ROUTES.STUDENT_DASHBOARD,
  COUNSELOR: ROUTES.COUNSELOR_DASHBOARD,
  ADMIN: ROUTES.ADMIN_DASHBOARD,
};

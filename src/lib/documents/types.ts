export type StudentDocumentStatus =
  | "PENDING"
  | "UNDER_REVIEW"
  | "RECEIVED"
  | "VERIFIED"
  | "REJECTED"
  | "WAIVED";

export type DocumentLinkContext = "REQUIRED_DOCUMENT" | "APPLICATION_FIELD";

export type DocumentLinkUsageItem = {
  contextType: DocumentLinkContext;
  contextKey: string;
};

export type DocumentLinkUsage = {
  documentId: string;
  total: number;
  items: DocumentLinkUsageItem[];
};

export type DocumentMatchState = "MATCHED" | "UNASSIGNED";

export type SelectedDocumentReference = {
  id: string;
  name: string;
  type: string;
  bucket: string | null;
  storagePath: string | null;
  mimeType: string | null;
  sizeBytes: number | null;
  status: StudentDocumentStatus;
};

export type VaultDocumentListItem = SelectedDocumentReference & {
  notes: string | null;
  uploadedAt: string | null;
  source: string | null;
  matchState: DocumentMatchState;
  matchedLabel: string | null;
};

export type RequiredDocumentLinkItem = {
  contextKey: string;
  document: SelectedDocumentReference;
};

export type ApplicationFieldDocumentLinkItem = {
  contextKey: string;
  document: SelectedDocumentReference;
};

export type StudentDocumentStatus =
  | "PENDING"
  | "UNDER_REVIEW"
  | "RECEIVED"
  | "VERIFIED"
  | "REJECTED"
  | "WAIVED";

export type DocumentMatchState = "MATCHED" | "UNASSIGNED";

export type SelectedDocumentReference = {
  id: string;
  name: string;
  bucket: string | null;
  storagePath: string | null;
  mimeType: string | null;
  sizeBytes: number | null;
  status: StudentDocumentStatus;
};

export type VaultDocumentListItem = SelectedDocumentReference & {
  type: string;
  notes: string | null;
  uploadedAt: string | null;
  source: string | null;
  matchState: DocumentMatchState;
  matchedLabel: string | null;
};

export type RequiredDocumentLinkItem = {
  contextKey: string;
  document: SelectedDocumentReference & {
    type: string;
  };
};

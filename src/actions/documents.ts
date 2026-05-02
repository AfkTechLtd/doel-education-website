"use server";

import {
  listStudentDocuments as listStudentDocumentsAction,
  createStudentDocumentRecord as createStudentDocumentRecordAction,
  deleteStudentDocument as deleteStudentDocumentAction,
  hardDeleteStudentDocument as hardDeleteStudentDocumentAction,
} from "./document-actions/vault-actions";

import {
  listApplicationFieldDocumentLinks as listApplicationFieldDocumentLinksAction,
  listResourceTemplateDocumentLinks as listResourceTemplateDocumentLinksAction,
} from "./document-actions/link-read-actions";

import {
  setApplicationFieldDocumentLink as setApplicationFieldDocumentLinkAction,
  setResourceTemplateDocumentLink as setResourceTemplateDocumentLinkAction,
} from "./document-actions/link-write-actions";

import {
  getDocumentLinkUsage as getDocumentLinkUsageAction,
  removeDocumentLink as removeDocumentLinkAction,
} from "./document-actions/link-usage-actions";

// ── Vault Operations ──────────────────────────────────────────────────────

export async function listStudentDocuments(...args: Parameters<typeof listStudentDocumentsAction>) {
  return listStudentDocumentsAction(...args);
}

export async function createStudentDocumentRecord(...args: Parameters<typeof createStudentDocumentRecordAction>) {
  return createStudentDocumentRecordAction(...args);
}

export async function deleteStudentDocument(...args: Parameters<typeof deleteStudentDocumentAction>) {
  return deleteStudentDocumentAction(...args);
}

export async function hardDeleteStudentDocument(...args: Parameters<typeof hardDeleteStudentDocumentAction>) {
  return hardDeleteStudentDocumentAction(...args);
}

// ── Link Read Operations ──────────────────────────────────────────────────

export async function listApplicationFieldDocumentLinks(...args: Parameters<typeof listApplicationFieldDocumentLinksAction>) {
  return listApplicationFieldDocumentLinksAction(...args);
}

export async function listResourceTemplateDocumentLinks(...args: Parameters<typeof listResourceTemplateDocumentLinksAction>) {
  return listResourceTemplateDocumentLinksAction(...args);
}

// ── Link Write Operations ─────────────────────────────────────────────────

export async function setApplicationFieldDocumentLink(...args: Parameters<typeof setApplicationFieldDocumentLinkAction>) {
  return setApplicationFieldDocumentLinkAction(...args);
}

export async function setResourceTemplateDocumentLink(...args: Parameters<typeof setResourceTemplateDocumentLinkAction>) {
  return setResourceTemplateDocumentLinkAction(...args);
}

// ── Link Usage Operations ─────────────────────────────────────────────────

export async function getDocumentLinkUsage(...args: Parameters<typeof getDocumentLinkUsageAction>) {
  return getDocumentLinkUsageAction(...args);
}

export async function removeDocumentLink(...args: Parameters<typeof removeDocumentLinkAction>) {
  return removeDocumentLinkAction(...args);
}

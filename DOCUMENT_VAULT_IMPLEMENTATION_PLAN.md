# Document Vault Implementation Plan

## Goal

Build a real student document system with:

1. A personal vault backed by Supabase Storage and Prisma `Document`
2. Delete support from the vault
3. A reusable document picker usable anywhere in the app
4. Two picker choices:
   - upload from local machine
   - choose from vault
5. Any new upload from anywhere also saved into the vault
6. Documents reusable in multiple places

## Locked Decisions

1. The same document can be linked in multiple places
2. Any upload from anywhere also becomes a vault item
3. Forms should store `documentId`
4. Delete should be blocked if a document is linked anywhere
5. Phase 1 should use a single bucket first

## Recommended Phase Order

1. Schema and backend foundation
2. Real vault page
3. Reusable picker modal
4. Application integrations

## Architecture

### Core Principle

- The vault is the source of truth for student-owned files
- Every uploaded file becomes a `Document`
- Everywhere else in the app stores a reference to that vault document
- Forms should store `documentId`, not raw file objects

### System Model

1. Student uploads a file
2. File goes to Supabase Storage
3. A `Document` row is created
4. That document appears in the student vault
5. Any application field can later:
   - select from vault
   - upload new
6. The field stores the chosen `documentId`
7. The same document can be linked in multiple places

### Storage Strategy

Use Supabase Storage.

Recommended path shape:

`students/{studentProfileId}/{documentId}/{fileName}`

Example:

`students/clx_student_1/research-focused-sop/sop.docx`

Why:

1. stable ownership
2. collision-safe
3. easy deletion
4. easy tracing

### Canonical Reference Rule

Everywhere in the system:

- forms store `documentId`
- file storage location comes from the `Document` record

Do not make forms store raw storage path only.

### Delete Policy

Rule:

- if a document is linked in any active application location, do not allow delete

Implementation location:

- `deleteStudentDocument` action

Response example:

```ts
{ success: false, error: "This file is currently used in your application." }
```

## File-By-File Plan

### 1. `prisma/schema.prisma`

Purpose:

- align `Document` with the PRD and the reusable vault system

Changes:

1. expand `DocumentStatus`

Current:

- `PENDING`
- `UPLOADED`
- `VERIFIED`
- `REJECTED`

Target:

- `PENDING`
- `UNDER_REVIEW`
- `RECEIVED`
- `VERIFIED`
- `REJECTED`
- `WAIVED`

2. update `Document` model if needed

Keep:

- `id`
- `studentId`
- `name`
- `type`
- `status`
- `storagePath`
- `bucket`
- `mimeType`
- `sizeBytes`
- `notes`
- `uploadedAt`
- `verifiedAt`
- `verifiedBy`

Recommended additions:

- `source String?`
  - values later: `VAULT_UPLOAD`, `FIELD_UPLOAD`
- optional later:
  - `deletedAt DateTime?`

3. do not add one-to-one attachment fields on `Document`

Reason:

- same document can be linked in many places

### 2. `src/lib/constants.ts`

Purpose:

- align frontend and backend status constants and bucket strategy

Changes:

1. update `DOCUMENT_STATUS` to match PRD statuses
2. optionally add labels mapping for document statuses
3. keep `STORAGE_BUCKETS`
4. for phase 1, add a single canonical bucket choice for uploads

Recommended:

- all uploads go to `STORAGE_BUCKETS.DOCUMENTS`

### 3. `src/lib/documents/paths.ts` new

Purpose:

- centralize storage path generation

Responsibilities:

1. build path from:
   - `studentProfileId`
   - `documentId`
   - original file name

Recommended output:

- `students/{studentProfileId}/{documentId}/{fileName}`

Export:

- `buildStudentDocumentStoragePath(...)`

### 4. `src/lib/documents/types.ts` new

Purpose:

- shared document and picker types

Exports:

1. `SelectedDocumentReference`
2. upload result types
3. picker result types

Recommended type:

```ts
type SelectedDocumentReference = {
  id: string;
  name: string;
  bucket: string | null;
  storagePath: string | null;
  mimeType: string | null;
  sizeBytes: number | null;
  status: string;
};
```

### 5. `src/lib/documents/ownership.ts` new

Purpose:

- centralize current student resolution and ownership checks

Responsibilities:

1. resolve current authenticated user
2. resolve current `StudentProfile`
3. verify document ownership before list, delete, and select actions

This prevents ownership logic from being duplicated everywhere.

### 6. `src/actions/documents.ts` new

Purpose:

- central server-side document actions

Actions to implement:

1. `createDocumentRecord`
   - create Prisma `Document` row after storage upload succeeds
2. `listStudentDocuments`
   - return current student’s vault docs from Prisma
3. `deleteStudentDocument`
   - verify ownership
   - check whether document is linked anywhere
   - if linked: return failure
   - if not linked:
     - delete storage object from Supabase bucket
     - delete Prisma row
4. `getStudentVaultDocumentsForPicker`
   - same ownership rules
   - lightweight shape for picker UI
5. optional later:
   - `getSignedDocumentUrl`
   - `renameDocument`
   - `replaceDocument`

All actions should follow repo convention:

```ts
{ success: boolean; error?: string; data?: T }
```

### 7. `src/lib/supabase/client.ts`

Purpose:

- browser upload support

Use:

- actual file upload to Supabase Storage from the client

No major structural changes needed, but it will be used by:

- vault modal upload
- picker upload tab

### 8. `src/lib/supabase/server.ts`

Purpose:

- server-side document ownership, listing, and deletion support

No major structural changes needed.

### 9. `src/data/student-documents.ts`

Purpose:

- remove later

Plan:

- this mock file should be phased out once Prisma-backed vault listing is ready

Short-term:

- keep until backend is working

Long-term:

- stop using it for `/student/documents`

### 10. `src/data/student-document-requirements.ts`

Purpose:

- can remain as a static requirement definition file in phase 1

Use:

- `Required Documents` tab

Later:

- requirement status should be derived from real linked documents, not hardcoded mocks

### 11. `src/app/(dashboard)/student/documents/page.tsx`

Purpose:

- server route for vault page

Refactor plan:

1. keep `requireRole([ROLES.STUDENT])`
2. replace mock-driven page composition with real data fetch
3. fetch:
   - current student vault docs from Prisma
   - required document definitions
4. pass into client page content

Eventually:

```tsx
<StudentDocumentVaultPageContent
  documents={realDocuments}
  requirements={derivedRequirements}
/>
```

### 12. `src/components/dashboard/student/StudentDocumentVaultPageContent.tsx`

Purpose:

- client wrapper for header action, modal, and vault page state

Responsibilities:

1. open upload modal
2. close upload modal
3. render header action button
4. refresh vault UI after successful upload and delete
5. later host picker-launch state if needed

Recommended future additions:

- refresh callback after upload success
- optimistic update or router refresh

### 13. `src/components/dashboard/student/StudentDocumentVault.tsx`

Purpose:

- main vault browsing UI

Responsibilities:

1. search
2. status filter
3. `All Files` / `Required Documents`
4. render real documents list
5. render empty states

Changes:

1. stop depending on mock-only assumptions
2. accept real Prisma-backed documents
3. on delete:
   - open confirm flow or delete directly
   - call `deleteStudentDocument`
   - refresh page or content

### 14. `src/components/dashboard/student/StudentDocumentCard.tsx`

Purpose:

- vault item row/card

Additions:

1. real delete button
2. maybe preview button later
3. show:
   - file name
   - type
   - uploaded date
   - size
   - status
   - matched/unassigned state
   - note if any

Delete behavior:

- disabled or guarded while linked
- show server error if document cannot be deleted

### 15. `src/components/dashboard/student/StudentRequiredDocumentCard.tsx`

Purpose:

- checklist view for required docs

Future behavior:

1. display linked document if available
2. display real status derived from linked docs
3. support `Choose Document` button later using picker modal

### 16. `src/components/dashboard/student/StudentDocumentToolbar.tsx`

Purpose:

- search + filter UI

Keep mostly as-is.

No major architectural changes needed.

### 17. `src/components/dashboard/student/StudentDocumentUploadModal.tsx`

Purpose:

- real upload modal shell

Future responsibilities:

1. host actual upload workflow
2. call close on success or cancel
3. possibly report uploaded documents back to parent

Additions:

- success callback prop:

```ts
onUploadComplete?: (documents: SelectedDocumentReference[]) => void;
```

### 18. `src/components/dashboard/student/StudentDocumentUploadZone.tsx`

Purpose:

- actual multi-file uploader

This becomes one of the most important components.

Responsibilities:

1. `react-dropzone`
2. multi-file selection
3. accepted and rejected file handling
4. real upload to Supabase Storage
5. create Prisma `Document` row after upload
6. return created document references

Required behavior:

1. upload multiple files
2. create one `Document` record per file
3. support drag/drop and local picker
4. show loading state
5. show per-file success and failure
6. clear selected files after success

Recommended internal flow:

1. user selects files
2. for each file:
   - generate document id
   - build storage path
   - upload to bucket
   - call action to create document row
3. collect successful uploads
4. call `onUploadComplete`

Recommended new props:

```ts
type StudentDocumentUploadZoneProps = {
  onCancel: () => void;
  onUploadComplete?: (documents: SelectedDocumentReference[]) => void;
};
```

### 19. `src/components/common/documents/DocumentPickerModal.tsx` new

Purpose:

- reusable Google Drive / Google Forms style document picker

This is the shared component used across the app.

Responsibilities:

1. modal shell
2. two tabs:
   - `From Vault`
   - `Upload New`
3. return selected or newly-created document reference to caller

Props:

```ts
type DocumentPickerModalProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (document: SelectedDocumentReference) => void;
  title?: string;
  allowedTypes?: string[];
};
```

### 20. `src/components/common/documents/VaultDocumentSelector.tsx` new

Purpose:

- vault tab inside picker

Responsibilities:

1. fetch or list current student docs
2. search or filter within vault
3. select one document
4. return selected document reference

Behavior:

- only current student’s docs
- optional filters by file type or category later

### 21. `src/components/common/documents/UploadNewDocumentPanel.tsx` new

Purpose:

- upload tab inside picker

Responsibilities:

1. reuse upload logic from vault uploader
2. upload new file(s)
3. save to vault
4. return created document reference immediately

Important rule:

- any upload here also becomes a vault item

### 22. `src/components/common/documents/DocumentPickerTrigger.tsx` optional new

Purpose:

- lightweight trigger helper for forms

Responsibilities:

1. open picker
2. show selected file name if present
3. hide picker state details from individual form fields

Optional but useful for consistency.

### 23. `src/components/dashboard/shell/dashboard-nav.ts`

Purpose:

- already wired to `/student/documents`

No major changes needed unless routes are renamed later.

### 24. Application section files later

Wherever uploads are needed:

- SOP section
- LOR section
- passport
- transcript
- affidavit
- financial proof

Plan:

1. replace isolated upload controls with `DocumentPickerModal`
2. field stores `documentId`
3. field displays selected document summary

This is the app-wide integration layer.

### 25. Linking Strategy Across The App

Because documents can be reused multiple times:

Phase 1:

- individual application fields store `documentId`

Phase 2 if needed:

- add a generic linking table like `DocumentLink`
- only if reuse patterns become complex enough

For now:

- storing `documentId` in each domain model or section payload is enough

### 26. Delete Policy

This must be enforced centrally.

Rule:

- if a document is linked in any active application location, do not allow delete

Implementation location:

- `deleteStudentDocument` action

### 27. Bucket Strategy

Locked recommendation:

- phase 1 uses a single bucket, likely `documents`

Reason:

1. simpler
2. stable
3. easier reusable picker logic

Later if needed:

- type-based routing to `sop`, `lor`, `general`

But not necessary to start.

### 28. Upload Flow Contract

Any place that uploads should follow this:

1. upload file
2. create `Document`
3. return `SelectedDocumentReference`
4. caller stores `documentId`
5. vault automatically includes the file

This is the core invariant.

### 29. Preview and Access Strategy

For viewing later:

- derive access from `bucket + storagePath`
- use signed URL or access helper
- do not treat `storageUrl` as the main permanent source of truth

## Execution Plan

### Phase 1: Foundation

1. update Prisma schema
2. run migration
3. update constants
4. add document helper libs
5. add document actions
6. add storage path generator

### Phase 2: Real Vault

1. wire real upload in modal
2. create `Document` rows
3. replace mock vault list with Prisma data
4. add delete with link checks
5. keep current UI

### Phase 3: Shared Picker

1. build `DocumentPickerModal`
2. build `From Vault` tab
3. build `Upload New` tab
4. return selected document references

### Phase 4: Form Integrations

1. replace field-level upload controls
2. use picker anywhere documents are needed
3. persist `documentId` in each feature

## Main Risks

1. delete behavior if linked documents are not tracked carefully
2. schema mismatch with PRD statuses
3. mixing storage path references directly into forms instead of using `documentId`
4. over-specializing bucket logic too early

## Final Recommendation

Use this rule everywhere:

- All uploaded documents first become vault documents
- All consumers reference those vault documents by `documentId`

That is the cleanest long-term system.

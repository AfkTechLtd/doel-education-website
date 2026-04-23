# Student Resources Phased Build Plan

## System Reminder

Your operational mode has changed from plan to build.
You are no longer in read-only mode.
You are permitted to make file changes, run shell commands, and utilize your tools as needed.

## Locked Decisions

1. Resource templates are global for all students.
2. Storage bucket for resource files is `resource_template`.
3. Database updates must be non-destructive; no database reset.
4. Existing resources UI and visual design must remain unchanged.
5. Seed showcase data will include 3 templates per category.
6. Initial showcase file for template URLs is `/test_content/test_document.pdf`.

## Progress Log

1. Phase 0 - Completed (2026-04-23)
   - Resources flow currently reads from static data files and not database-backed queries.
   - Placeholder behavior is still active on detail view (download disabled and "Available soon").
   - Prisma schema is valid and DB is currently in sync with schema (`prisma validate`, `prisma migrate status`, and `prisma migrate diff` checks).
   - Safe migration path remains additive-only with no reset and no destructive operations.
2. Phase 1 - Completed (2026-04-23)
   - Added additive schema primitives for resources: `Resource` model, `ResourceTemplate.slug`, `ResourceTemplate.resourceId`, and relation wiring.
   - Extended document link context with `RESOURCE_TEMPLATE` for ecosystem alignment.
   - Added `STORAGE_BUCKETS.RESOURCE_TEMPLATE` constant with fallback value `resource_template`.
   - Prisma schema validation passes after changes (`prisma validate`).
3. Phase 2 - Completed (2026-04-23)
   - Added a manual reconciliation migration to codify previously drifted document-system changes without resetting the database.
   - Included additive resource migration SQL: `ResourceType`, `resources` table, `resource_templates.slug`, `resource_templates.resource_id`, indexes, and foreign key.
   - Backfilled base resource rows (`sop`, `lor`, `affidavit`) and mapped existing templates by `type`.
   - Applied the migration successfully with `prisma migrate deploy`, and `prisma migrate status` now reports the database as up to date.
4. Phase 3 - Completed (2026-04-23)
   - Extended `prisma/seed.ts` to upsert the 3 resource categories and 9 showcase templates.
   - All showcase templates point to `/test_content/test_document.pdf` while using unique titles, descriptions, slugs, and sample content.
   - Seed flow is idempotent through `upsert` on resource/category slugs and template slugs.
   - Verified post-seed counts: `sop`, `lor`, and `affidavit` each have 3 templates.
5. Phase 4 - Completed (2026-04-23)
   - Added `src/lib/resources/types.ts` to define normalized DB-backed resource and template DTOs for the student resources flow.
   - Added `src/actions/resources.ts` with student-safe read actions for resource list, category templates, and template detail.
   - Resource/template records are normalized from Prisma rows into UI-friendly payloads, including safe template type normalization.
   - Verified the new files with targeted ESLint and module import checks.
6. Phase 5 - Completed (2026-04-23)
   - Rewired the student resources routes to use the new DB-backed resource actions instead of static local data files.
   - Updated shared resource components to consume normalized resource/template DTOs from `src/lib/resources/types.ts`.
   - Preserved the current route shape and visual layout while switching category/template links to slug-based DB records.
   - Removed remaining static resource data imports from the student resources flow and verified the updated routes/components with ESLint.
7. Phase 6 - Completed (2026-04-23)
   - Converted the resource detail page from placeholder mode to a live file/content experience.
   - `StudentResourceDownloadButton` now renders a working download link when a file URL exists and falls back to a disabled state only when no file is attached.
   - `StudentResourceDocumentPreview` now embeds live PDF previews, supports image previews, keeps a fallback visual template preview, and renders template guidance content below the file viewer.
   - Verified the placeholder copy is gone, lint passes for the updated detail-page files, and seeded templates expose a real `fileUrl` (`/test_content/test_document.pdf`).
8. Phase 7 - Completed (2026-04-23)
   - Extended the document ecosystem to support `DocumentLinkContext.RESOURCE_TEMPLATE`, including new document-link types and server actions for listing and setting resource-template links.
   - The resource detail page now includes a student-specific linked draft workflow backed by the existing vault picker/upload system.
   - Improved mobile responsiveness and touch usability across the resource detail view and shared document controls by stacking actions cleanly, expanding tap targets, and making primary actions full width on small screens.
   - Updated delete-usage messaging so vault documents linked to resource templates are clearly represented, and verified the full Phase 7 file set with ESLint.

## Phase 0 - Baseline and Safety Snapshot

### Goals

1. Confirm current resources routes, components, and static data usage.
2. Confirm migration approach is additive and reset-free.
3. Confirm sample file path and bucket decision.

### Deliverables

1. Safety checklist for schema rollout.
2. Final migration strategy before schema edits.

### Acceptance

1. No code changes required in this phase.
2. Schema rollout plan approved.

## Phase 1 - Schema Expansion (Additive)

### Goals

1. Add `Resource` model as category collection.
2. Extend `ResourceTemplate` with `slug` and `resourceId` relation.
3. Extend `DocumentLinkContext` with `RESOURCE_TEMPLATE`.
4. Add new fields in a compatibility-safe way.

### Deliverables

1. Updated `prisma/schema.prisma`.

### Acceptance

1. `prisma validate` passes.
2. Schema changes are additive only.

## Phase 2 - Safe Migration and Backfill

### Goals

1. Create forward-only migration for new table/columns/indexes/enum value.
2. Backfill resources: SOP, LOR, AFFIDAVIT.
3. Backfill template `resourceId` and `slug` for existing records.
4. Avoid any destructive operation.

### Deliverables

1. Migration SQL in `prisma/migrations/.../migration.sql`.

### Acceptance

1. Migration runs without reset.
2. Existing data remains intact.

## Phase 3 - Showcase Seed Data

### Goals

1. Seed 9 templates total (3 per category).
2. Use unique titles/descriptions/slugs.
3. Reuse `fileUrl` as `/test_content/test_document.pdf`.
4. Keep seed idempotent where possible.

### Deliverables

1. Updated seed logic in `prisma/seed.ts` or a dedicated resource seed file.

### Acceptance

1. DB includes 3 resources and 9 public templates.
2. Re-running seed does not create uncontrolled duplicates.

## Phase 4 - Resource Data Access Layer

### Goals

1. Add student-safe read actions for resources and templates.
2. Follow action return contract `{ success, error?, data? }`.
3. Enforce role checks for student routes.

### Deliverables

1. New/updated actions file for resource queries.

### Acceptance

1. Resource list and detail actions return correct payloads.
2. Invalid category/template returns safe errors.

## Phase 5 - Route Wiring (UI Unchanged)

### Goals

1. Replace static data sources with DB actions in resources pages.
2. Keep route structure unchanged: `/student/resources/[category]/[resourceId]`.
3. Keep current layout and component visuals unchanged.

### Target Files

1. `src/app/(dashboard)/student/resources/page.tsx`
2. `src/app/(dashboard)/student/resources/[category]/page.tsx`
3. `src/app/(dashboard)/student/resources/[category]/[resourceId]/page.tsx`

### Acceptance

1. Pages render DB-backed content.
2. Existing UI style remains the same.

## Phase 6 - Detail Page Functional Fix

### Goals

1. Remove "Available soon" placeholder behavior.
2. Load real template data on detail page.
3. Enable working file open/download path when `fileUrl` exists.

### Deliverables

1. Updated detail page data flow and action usage.

### Acceptance

1. Opening a template shows real content data.
2. Download/open points to the sample PDF URL.

## Phase 7 - Document Ecosystem Integration

### Goals

1. Support `RESOURCE_TEMPLATE` context in link ecosystem.
2. Keep existing required-doc and application-field links unaffected.

### Deliverables

1. Minimal document-link extension for template context.

### Acceptance

1. No regressions in existing document vault behaviors.
2. Resource-template link context is supported.

## Phase 8 - Loading States, QA, and Stability

### Goals

1. Add missing resources route loading states.
2. Run lint/build checks.
3. Verify end-to-end student resources flow.

### Deliverables

1. `loading.tsx` files for resources routes as needed.
2. Verification report of lint/build/manual checks.

### Acceptance

1. Lint and build complete successfully.
2. Student resources pages and detail flow work as expected.

## Execution Protocol

1. Implement phase-by-phase in sequence.
2. Complete and verify one phase before moving to next.
3. Record any deviation from this plan before applying it.
4. Keep migration and schema work reset-free and additive.

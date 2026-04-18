# Doel Education — CLAUDE.md

## Project Identity

**Doel Education** is a Next.js full-stack web application for an education consultancy helping students (primarily from Bangladesh) pursue study in the US. The platform has two major surfaces:

1. **Public marketing site** — landing pages, blog, events, Q&A, contact, consultation booking (already built).
2. **Authenticated platform** — Student Portal, Counselor (Moderator) Portal, and Admin Panel with role-based access control (RBAC). This is the active development focus.

---

## Tech Stack

| Layer              | Choice                                                                 |
| ------------------ | ---------------------------------------------------------------------- |
| Framework          | **Next.js 16** (App Router, Server Components, Server Actions, API Routes) |
| Runtime            | **React 19**, **TypeScript** (strict mode)                             |
| Styling            | **Tailwind CSS v4** (`@import "tailwindcss"`, `@theme` block in CSS)   |
| Animation          | **Framer Motion**, **Swiper**, CSS keyframes                           |
| Icons              | **lucide-react**                                                       |
| Class utilities    | **clsx**, **tailwind-merge**                                           |
| ORM                | **Prisma** (PostgreSQL via Supabase)                                   |
| Database           | **Supabase PostgreSQL**                                                |
| Auth               | **Supabase Auth** (email/password; optional OAuth later)               |
| Storage            | **Supabase Storage** (multiple buckets per document type)              |
| Realtime           | **Supabase Realtime** (notifications, alerts)                          |

Additional packages added as needed — no speculative installs.

---

## Commands

```bash
npm run dev          # Next.js dev server
npm run build        # Production build
npm run start        # Run production server
npm run lint         # ESLint
npx prisma generate  # Generate Prisma client after schema changes
npx prisma migrate dev --name <name>  # Create and apply migration
npx prisma db push   # Push schema to DB without migration (dev only)
npx prisma studio    # Visual DB browser
```

---

## Repository Layout

```
src/
├── app/
│   ├── (public)/                # Public marketing pages (existing)
│   │   ├── page.tsx             # Home
│   │   ├── study-in-us/
│   │   ├── services/
│   │   ├── about/
│   │   ├── events/
│   │   ├── blog/
│   │   ├── qna/
│   │   ├── contact/
│   │   └── consultation/
│   ├── (auth)/                  # Auth pages (single login flow)
│   │   ├── login/
│   │   ├── register/            # Student self-registration only
│   │   └── forgot-password/
│   ├── (dashboard)/             # Authenticated dashboard routes
│   │   ├── layout.tsx           # Shared dashboard shell (sidebar, topbar)
│   │   ├── student/             # Student portal pages
│   │   │   ├── page.tsx         # Student dashboard home
│   │   │   ├── application/     # 14-section application tracker
│   │   │   ├── documents/       # Document vault
│   │   │   ├── resources/       # Templates (SOP, LOR, Affidavit)
│   │   │   ├── messages/        # Chat with counselor
│   │   │   ├── history/         # Application history
│   │   │   ├── i20/             # Post-admission: I-20 processing
│   │   │   ├── visa/            # Post-admission: Visa preparation
│   │   │   └── pre-departure/   # Post-admission: Pre-departure checklist
│   │   ├── counselor/           # Moderator/Counselor portal pages
│   │   │   ├── page.tsx         # Counselor dashboard (KPIs, alerts)
│   │   │   ├── students/        # Student list + Kanban board
│   │   │   ├── students/[id]/   # Student detail view
│   │   │   └── messages/        # Messaging
│   │   └── admin/               # Admin portal pages
│   │       ├── page.tsx         # Admin dashboard (analytics)
│   │       ├── users/           # User & role management
│   │       ├── assignments/     # Counselor assignment (manual + auto)
│   │       └── settings/        # System settings, RBAC config
│   ├── api/                     # API routes (when Server Actions don't fit)
│   └── layout.tsx               # Root layout
├── components/
│   ├── common/                  # Shared UI (buttons, inputs, modals, badges)
│   ├── Home/                    # Public homepage sections (existing)
│   ├── dashboard/               # Shared dashboard components
│   │   ├── Sidebar.tsx
│   │   ├── Topbar.tsx
│   │   ├── StatsCard.tsx
│   │   └── StatusBadge.tsx
│   ├── student/                 # Student-specific components
│   ├── counselor/               # Counselor-specific components
│   └── admin/                   # Admin-specific components
├── lib/
│   ├── supabase/
│   │   ├── client.ts            # Browser Supabase client
│   │   ├── server.ts            # Server-side Supabase client
│   │   └── middleware.ts        # Auth middleware helper
│   ├── prisma.ts                # Prisma client singleton
│   ├── auth.ts                  # Auth utilities (getUser, requireRole, etc.)
│   ├── constants.ts             # App-wide constants, enums
│   └── utils.ts                 # General utilities
├── actions/                     # Server Actions grouped by domain
│   ├── auth.ts
│   ├── application.ts
│   ├── documents.ts
│   ├── kanban.ts
│   ├── messaging.ts
│   └── admin.ts
├── types/                       # TypeScript types and interfaces
│   ├── database.ts              # Mirrors Prisma schema types
│   ├── application.ts           # Application section types
│   └── index.ts                 # Barrel exports
├── data/                        # Static data (nav links, footer, etc.)
├── hooks/                       # Custom React hooks
├── styles/
│   └── globals.css              # Tailwind entry, @theme tokens, utilities
prisma/
├── schema.prisma                # Database schema (single source of truth)
├── migrations/                  # Migration history
└── seed.ts                      # Seed script for dev data
public/                          # Static assets
```

**Path alias:** `@/*` → `src/*` (tsconfig.json)

---

## Architecture Decisions

### Single Codebase with RBAC
All three portals (Student, Counselor, Admin) live in one Next.js project. A single `/login` route authenticates all users. After login, the backend reads the user's role from the database and redirects:
- `student` → `/student`
- `counselor` → `/counselor`
- `admin` → `/admin`

### Auth & RBAC Flow
1. **Supabase Auth** handles authentication (sign-up, login, sessions, password reset).
2. On sign-up/provisioning, a corresponding row is created in the Prisma `User` table with a `role` field (`STUDENT | COUNSELOR | ADMIN`).
3. **Next.js Middleware** (`src/middleware.ts`) runs on every `/(dashboard)/*` route:
   - Checks for a valid Supabase session.
   - Reads the user's role from the database (cached in session/JWT custom claims).
   - Redirects unauthorized users (e.g., a student trying to access `/admin`).
4. Server Actions and API routes independently verify role before performing mutations.
5. Students self-register. Counselors and admins are provisioned by an admin.

### Database Strategy
- **Prisma** is the ORM and the single source of truth for the database schema.
- **Supabase PostgreSQL** is the database provider.
- **Supabase Storage** handles file uploads with separate buckets:
  - `documents` — passports, financials, transcripts
  - `sop` — statements of purpose
  - `lor` — letters of recommendation
  - `general` — miscellaneous uploads
- **Supabase Realtime** is used for notifications and alert feeds.

### Server Actions over API Routes
Prefer Next.js Server Actions for all mutations (form submissions, status changes, document operations). Use API routes only when an external webhook or a non-Next.js client needs an endpoint.

---

## Design System

### Tokens (from `globals.css`)
- **Primary:** `--color-primary` → `#0b5c59` (teal/green brand)
- **Accent:** `--color-secondary` → `#ffab17` (amber/gold)
- **Fonts:** Inter (body via `--font-inter`) and Poppins (headings via `--font-poppins`), loaded with `next/font`

### Dashboard UI Conventions
- Dashboard pages use a **clean, professional, minimal** aesthetic — no marketing flair.
- Consistent status iconography across all portals:
  - Green check → Verified / Complete
  - Red X → Rejected / Error
  - Yellow clock → Pending / Under Review
  - Blue info → Informational
  - Gray dash → Waived / Not Required
- Use `StatusBadge` component for all document and application statuses.
- Cards use subtle borders (`border border-gray-200`), not heavy shadows.
- Sidebar navigation is persistent on desktop, collapsible on mobile.

### Component Rules
- `"use client"` only where hooks, browser APIs, or interactivity are needed.
- Prefer Server Components for data-fetching pages.
- Shared UI in `components/common/`, portal-specific UI in `components/{student,counselor,admin}/`.
- All form components must include field-level validation matching the PRD spec (GPA ranges, ISO dates, required fields).

---

## Data Models (Prisma Schema Reference)

Key models to implement:

```
User           — id, supabaseId, email, name, role (STUDENT/COUNSELOR/ADMIN), createdAt
StudentProfile — userId, phone, dateOfBirth, nationality, address, counselorId (FK to User)
Application    — id, studentId, status (DRAFT/SUBMITTED/LOCKED/ADMITTED/VISA/COMPLETED), currentSection, submittedAt, lockedAt
ApplicationSection — id, applicationId, sectionNumber (1-14), sectionName, data (JSON), isComplete, updatedAt
Document       — id, studentId, applicationId?, fileName, fileType, storageBucket, storagePath, status (PENDING/UNDER_REVIEW/RECEIVED/VERIFIED/REJECTED/WAIVED), uploadedAt, reviewedAt, reviewedBy
Message        — id, senderId, receiverId, applicationId?, content, isRead, createdAt
Notification   — id, userId, type, title, message, isRead, metadata (JSON), createdAt
CounselorNote  — id, counselorId, studentId, stage (I20/VISA/PRE_DEPARTURE), content (Markdown), updatedAt
ResourceTemplate — id, name, description, fileUrl, category (SOP/LOR/AFFIDAVIT)
```

Enums: `Role`, `ApplicationStatus`, `DocumentStatus`, `SectionNumber`, `NotificationType`, `CounselorNoteStage`

---

## Application Sections (14 total)

The student application tracker has these sections, each stored as a JSON blob in `ApplicationSection.data` with typed validation:

1. Personal Information / Background
2. Academic History / Information
3. Program Selection (Term, Program Details)
4. Test Requirements by Program
5. Test Information / Scores (numerical validation: GPA 0.0–4.0, SAT 400–1600, etc.)
6. Personal Statement / SOP
7. Extracurricular Activities
8. Family Information
9. Recommendation Requirements by Program
10. Recommendations / LOR (recommender tracking)
11. Scholarships / Aid
12. Additional / Supplemental Questions
13. Community Standards / Conduct Disclosure
14. Signature & Final Review

**On Final Submission:** All fields lock to read-only. UI transitions to "View Application" mode. An "Application Result" status page activates.

---

## Kanban Board (Counselor Portal)

Columns and their trigger events:

| Column      | Meaning                                      | Trigger on Move                                    |
| ----------- | -------------------------------------------- | -------------------------------------------------- |
| New Docs    | Student has unreviewed uploads               | Alert counselor                                    |
| Pending     | Active student, application incomplete       | Default column                                     |
| Applied     | Student completed Final Submission (locked)  | Lock application fields                            |
| Admitted    | Student accepted by university               | Activate I-20 and Visa tabs in Student Portal      |
| Visa Stage  | Student in visa processing                   | Activate Pre-Departure tab in Student Portal       |

---

## Document Statuses

| Status       | Definition                                  | Trigger                          |
| ------------ | ------------------------------------------- | -------------------------------- |
| Pending      | Uploaded by student, awaiting review        | `OnDocumentUpload`               |
| Under Review | Moderator has opened for evaluation         | `OnDocumentOpen` (Moderator)     |
| Received     | Successfully ingested                       | Automated upload check           |
| Verified     | Meets all criteria                          | Moderator manual action          |
| Rejected     | Invalid, requires re-upload                 | Moderator action + student alert |
| Waived       | Admin override, not required for this user  | Moderator/Admin manual action    |

---

## Event-Driven Notifications

| Event              | Action                                                   |
| ------------------ | -------------------------------------------------------- |
| `OnStatusChange`   | Alert student when document is Verified/Rejected         |
| `OnNewMessage`     | Browser notification + optional email to recipient       |
| `OnDocumentUpload` | Entry appears in Counselor's "New Docs" Kanban column    |
| `OnKanbanMove`     | Activate/deactivate post-admission tabs for student      |

---

## Validation Rules

- Dates: `YYYY-MM-DD` format (ISO), use input masking
- GPA: `0.0–4.0` float
- SAT: `400–1600` integer
- TOEFL: `0–120` integer
- IELTS: `0.0–9.0` float (0.5 increments)
- GRE: `260–340` integer
- Required fields enforced per-section before marking section complete
- Email format validation on all email fields
- Phone: international format with country code

---

## Out of Scope (Phase 1)

- Payment gateway integration
- Legacy database migration
- Direct API integration with university SIS
- Smart Auto-fill (document name matching) — leave architectural space but don't implement
- Mobile native apps

---

## Coding Conventions

1. **File naming:** kebab-case for files, PascalCase for components, camelCase for utilities.
2. **Imports:** Use `@/` path alias always. Group: external → internal → types → styles.
3. **Error handling:** Every Server Action returns `{ success: boolean; error?: string; data?: T }`. Use try-catch. Never expose raw DB errors to the client.
4. **Loading states:** Every async page must have a `loading.tsx`. Every form submission must disable the submit button and show a spinner.
5. **Prisma:** Always use the singleton from `@/lib/prisma`. Never import `PrismaClient` directly.
6. **Supabase:** Use server client (`@/lib/supabase/server`) in Server Components and Actions. Use browser client (`@/lib/supabase/client`) in client components. Never expose the service role key to the client.
7. **Validation:** Use Zod schemas for all form validation. Share schemas between client and server.
8. **Types:** Define in `src/types/`. Prisma-generated types are supplementary; define explicit interfaces for component props and action payloads.
9. **Commits:** Conventional commits — `feat:`, `fix:`, `chore:`, `refactor:`.
10. **No magic strings:** Use constants/enums from `@/lib/constants` for roles, statuses, section numbers.
11. **Images:** Prefer `next/image` for LCP images. Static assets in `public/`.
12. **Accessibility:** All interactive elements need proper `aria-*` labels. Forms need `<label>` associations.

---

## Notes

- The public marketing site is already built and should not be broken by dashboard work.
- The `(public)` route group wraps existing marketing pages. The `Navbar` and `Footer` for public pages are in the root layout but should NOT appear on dashboard routes — the `(dashboard)` layout has its own shell.
- When adding packages, add them one at a time with clear justification.
- Zod should be added for validation. dnd-kit or @hello-pangea/dnd for the Kanban board. react-markdown for Markdown rendering in counselor notes. These are expected additions.
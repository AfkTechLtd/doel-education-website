-- Reconcile previously applied document-system drift and add resource models.

-- Ensure DocumentLinkContext exists before creating document_links.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_type
    WHERE typname = 'DocumentLinkContext'
  ) THEN
    CREATE TYPE "DocumentLinkContext" AS ENUM ('REQUIRED_DOCUMENT', 'APPLICATION_FIELD');
  END IF;
END $$;

ALTER TYPE "DocumentLinkContext" ADD VALUE IF NOT EXISTS 'RESOURCE_TEMPLATE';

-- Reconcile DocumentStatus from the initial migration to the current schema.
DO $$
DECLARE
  has_uploaded BOOLEAN;
  has_under_review BOOLEAN;
  has_received BOOLEAN;
  has_waived BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1
    FROM pg_enum
    WHERE enumtypid = '"DocumentStatus"'::regtype
      AND enumlabel = 'UPLOADED'
  ) INTO has_uploaded;

  SELECT EXISTS (
    SELECT 1
    FROM pg_enum
    WHERE enumtypid = '"DocumentStatus"'::regtype
      AND enumlabel = 'UNDER_REVIEW'
  ) INTO has_under_review;

  SELECT EXISTS (
    SELECT 1
    FROM pg_enum
    WHERE enumtypid = '"DocumentStatus"'::regtype
      AND enumlabel = 'RECEIVED'
  ) INTO has_received;

  SELECT EXISTS (
    SELECT 1
    FROM pg_enum
    WHERE enumtypid = '"DocumentStatus"'::regtype
      AND enumlabel = 'WAIVED'
  ) INTO has_waived;

  IF has_uploaded OR NOT has_under_review OR NOT has_received OR NOT has_waived THEN
    ALTER TYPE "DocumentStatus" RENAME TO "DocumentStatus_old";
    CREATE TYPE "DocumentStatus" AS ENUM (
      'PENDING',
      'UNDER_REVIEW',
      'RECEIVED',
      'VERIFIED',
      'REJECTED',
      'WAIVED'
    );

    ALTER TABLE "documents"
      ALTER COLUMN "status" DROP DEFAULT;

    ALTER TABLE "documents"
      ALTER COLUMN "status" TYPE "DocumentStatus"
      USING (
        CASE
          WHEN "status"::text = 'UPLOADED' THEN 'RECEIVED'
          ELSE "status"::text
        END
      )::"DocumentStatus";

    ALTER TABLE "documents"
      ALTER COLUMN "status" SET DEFAULT 'PENDING';

    DROP TYPE "DocumentStatus_old";
  END IF;
END $$;

ALTER TABLE "documents"
  ADD COLUMN IF NOT EXISTS "source" TEXT;

CREATE TABLE IF NOT EXISTS "document_links" (
  "id" TEXT NOT NULL,
  "student_id" TEXT NOT NULL,
  "document_id" TEXT NOT NULL,
  "context_type" "DocumentLinkContext" NOT NULL,
  "context_key" TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "document_links_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "document_links_student_id_context_type_context_key_key"
  ON "document_links"("student_id", "context_type", "context_key");

CREATE INDEX IF NOT EXISTS "document_links_document_id_idx"
  ON "document_links"("document_id");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'document_links_student_id_fkey'
  ) THEN
    ALTER TABLE "document_links"
      ADD CONSTRAINT "document_links_student_id_fkey"
      FOREIGN KEY ("student_id") REFERENCES "student_profiles"("id")
      ON DELETE CASCADE
      ON UPDATE CASCADE;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'document_links_document_id_fkey'
  ) THEN
    ALTER TABLE "document_links"
      ADD CONSTRAINT "document_links_document_id_fkey"
      FOREIGN KEY ("document_id") REFERENCES "documents"("id")
      ON DELETE CASCADE
      ON UPDATE CASCADE;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_type
    WHERE typname = 'ResourceType'
  ) THEN
    CREATE TYPE "ResourceType" AS ENUM ('SOP', 'LOR', 'AFFIDAVIT');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS "resources" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "type" "ResourceType" NOT NULL,
  "is_active" BOOLEAN NOT NULL DEFAULT true,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "resources_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "resources_slug_key"
  ON "resources"("slug");

CREATE INDEX IF NOT EXISTS "resources_is_active_idx"
  ON "resources"("is_active");

ALTER TABLE "resource_templates"
  ADD COLUMN IF NOT EXISTS "slug" TEXT,
  ADD COLUMN IF NOT EXISTS "resource_id" TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS "resource_templates_slug_key"
  ON "resource_templates"("slug");

CREATE INDEX IF NOT EXISTS "resource_templates_resource_id_is_public_idx"
  ON "resource_templates"("resource_id", "is_public");

CREATE INDEX IF NOT EXISTS "resource_templates_resource_id_idx"
  ON "resource_templates"("resource_id");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'resource_templates_resource_id_fkey'
  ) THEN
    ALTER TABLE "resource_templates"
      ADD CONSTRAINT "resource_templates_resource_id_fkey"
      FOREIGN KEY ("resource_id") REFERENCES "resources"("id")
      ON DELETE SET NULL
      ON UPDATE CASCADE;
  END IF;
END $$;

INSERT INTO "resources" ("id", "slug", "name", "description", "type", "is_active", "created_at", "updated_at")
VALUES
  (
    'resource_sop',
    'sop',
    'SOP',
    'Browse statement of purpose templates for academic, scholarship, and career-focused applications.',
    'SOP',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'resource_lor',
    'lor',
    'LOR',
    'Explore recommendation letter templates for academic, professional, and leadership use cases.',
    'LOR',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'resource_affidavit',
    'affidavit',
    'Affidavit',
    'Review affidavit templates for sponsorship, family support, and self-funding documentation.',
    'AFFIDAVIT',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  )
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "description" = EXCLUDED."description",
  "type" = EXCLUDED."type",
  "is_active" = EXCLUDED."is_active",
  "updated_at" = CURRENT_TIMESTAMP;

UPDATE "resource_templates"
SET "resource_id" = CASE UPPER("type")
  WHEN 'SOP' THEN 'resource_sop'
  WHEN 'LOR' THEN 'resource_lor'
  WHEN 'AFFIDAVIT' THEN 'resource_affidavit'
  ELSE "resource_id"
END
WHERE "resource_id" IS NULL;

UPDATE "resource_templates"
SET "slug" = CONCAT(
  COALESCE(
    NULLIF(
      LOWER(
        REGEXP_REPLACE(
          REGEXP_REPLACE(TRIM("title"), '[^a-zA-Z0-9]+', '-', 'g'),
          '(^-|-$)',
          '',
          'g'
        )
      ),
      ''
    ),
    'resource-template'
  ),
  '-',
  SUBSTRING("id" FROM 1 FOR 6)
)
WHERE "slug" IS NULL;

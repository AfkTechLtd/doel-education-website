/*
  Warnings:

  - You are about to drop the column `completed_sections` on the `applications` table. All the data in the column will be lost.
  - You are about to drop the column `intended_program` on the `applications` table. All the data in the column will be lost.
  - You are about to drop the column `intended_university` on the `applications` table. All the data in the column will be lost.
  - You are about to drop the column `target_semester` on the `applications` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the `application_sections` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `requirement_id` to the `documents` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "application_sections" DROP CONSTRAINT "application_sections_application_id_fkey";

-- DropIndex
DROP INDEX "documents_student_id_status_idx";

-- AlterTable
ALTER TABLE "applications" DROP COLUMN "completed_sections",
DROP COLUMN "intended_program",
DROP COLUMN "intended_university",
DROP COLUMN "target_semester",
ADD COLUMN     "degree_program" TEXT,
ADD COLUMN     "start_term" TEXT,
ADD COLUMN     "target_university" TEXT;

-- AlterTable
ALTER TABLE "documents" DROP COLUMN "status",
ADD COLUMN     "requirement_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "application_sections";

-- DropEnum
DROP TYPE "SectionNumber";

-- CreateTable
CREATE TABLE "app_personal_info" (
    "id" TEXT NOT NULL,
    "application_id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "date_of_birth" TIMESTAMP(3),
    "phone" TEXT,
    "nationality" TEXT,
    "gender" TEXT,
    "address" TEXT,

    CONSTRAINT "app_personal_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_academic_records" (
    "id" TEXT NOT NULL,
    "application_id" TEXT NOT NULL,
    "schoolName" TEXT,
    "schoolCity" TEXT,
    "schoolCountry" TEXT,
    "degreeObtained" TEXT,
    "graduation_date" TIMESTAMP(3),
    "fieldOfStudy" TEXT,
    "gpa" DOUBLE PRECISION,

    CONSTRAINT "app_academic_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_test_scores" (
    "id" TEXT NOT NULL,
    "application_id" TEXT NOT NULL,
    "requiresSAT" BOOLEAN NOT NULL DEFAULT false,
    "requiresACT" BOOLEAN NOT NULL DEFAULT false,
    "requiresTOEFL" BOOLEAN NOT NULL DEFAULT false,
    "requiresIELTS" BOOLEAN NOT NULL DEFAULT false,
    "requiresGRE" BOOLEAN NOT NULL DEFAULT false,
    "requiresGMAT" BOOLEAN NOT NULL DEFAULT false,
    "satMath" INTEGER,
    "satReading" INTEGER,
    "actComposite" INTEGER,
    "toeflScore" INTEGER,
    "ieltsScore" DOUBLE PRECISION,
    "greVerbal" INTEGER,
    "greQuantitative" INTEGER,
    "gmatScore" INTEGER,
    "test_date" TIMESTAMP(3),

    CONSTRAINT "app_test_scores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_financial_standing" (
    "id" TEXT NOT NULL,
    "application_id" TEXT NOT NULL,
    "sponsorFullName" TEXT,
    "sponsorRelationship" TEXT,
    "sponsorOccupation" TEXT,
    "sponsor_annual_income" DOUBLE PRECISION,
    "bankBalance" DOUBLE PRECISION,
    "primaryCurrency" TEXT,
    "fixedDepositAmount" DOUBLE PRECISION,
    "investmentAssets" DOUBLE PRECISION,
    "realEstateValue" DOUBLE PRECISION,
    "businessAssets" DOUBLE PRECISION,
    "otherAssets" DOUBLE PRECISION,
    "totalLiabilities" DOUBLE PRECISION,
    "fundsAvailableForStudy" DOUBLE PRECISION,
    "fundingSource" TEXT,
    "annualTuitionBudget" DOUBLE PRECISION,
    "annualLivingBudget" DOUBLE PRECISION,
    "applyingForScholarship" BOOLEAN NOT NULL DEFAULT false,
    "scholarshipType" TEXT,
    "financialAidRequired" BOOLEAN NOT NULL DEFAULT false,
    "hasBankStatement" BOOLEAN NOT NULL DEFAULT false,
    "hasSolvencyLetter" BOOLEAN NOT NULL DEFAULT false,
    "hasIncomeTaxReturn" BOOLEAN NOT NULL DEFAULT false,
    "hasPropertyDocuments" BOOLEAN NOT NULL DEFAULT false,
    "hasSponsorLetter" BOOLEAN NOT NULL DEFAULT false,
    "hasLoanApprovalLetter" BOOLEAN NOT NULL DEFAULT false,
    "financialNotes" TEXT,

    CONSTRAINT "app_financial_standing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_extracurriculars" (
    "id" TEXT NOT NULL,
    "application_id" TEXT NOT NULL,
    "activities" TEXT,
    "leadershipRoles" TEXT,
    "awardsHonors" TEXT,
    "communityService" TEXT,

    CONSTRAINT "app_extracurriculars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_family_info" (
    "id" TEXT NOT NULL,
    "application_id" TEXT NOT NULL,
    "fatherName" TEXT,
    "fatherOccupation" TEXT,
    "fatherEducation" TEXT,
    "motherName" TEXT,
    "motherOccupation" TEXT,
    "motherEducation" TEXT,
    "guardianName" TEXT,
    "guardianPhone" TEXT,
    "guardianRelationship" TEXT,

    CONSTRAINT "app_family_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_recommenders" (
    "id" TEXT NOT NULL,
    "application_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "email" TEXT NOT NULL,
    "institution" TEXT,
    "requestStatus" TEXT NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "app_recommenders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_supplemental" (
    "id" TEXT NOT NULL,
    "application_id" TEXT NOT NULL,
    "personalStatement" TEXT,
    "whyThisUniversity" TEXT,
    "whyThisProgram" TEXT,
    "hearAboutUs" TEXT,
    "additionalInfo" TEXT,
    "requirementNotes" TEXT,

    CONSTRAINT "app_supplemental_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_conduct_agreements" (
    "id" TEXT NOT NULL,
    "application_id" TEXT NOT NULL,
    "hasCriminalRecord" BOOLEAN NOT NULL DEFAULT false,
    "hasAcademicViolation" BOOLEAN NOT NULL DEFAULT false,
    "hasDisciplinaryAction" BOOLEAN NOT NULL DEFAULT false,
    "conductExplanation" TEXT,
    "agreeToConduct" BOOLEAN NOT NULL DEFAULT false,
    "agreeToTerms" BOOLEAN NOT NULL DEFAULT false,
    "agreeToAccuracy" BOOLEAN NOT NULL DEFAULT false,
    "signature" TEXT,
    "signedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "app_conduct_agreements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document_requirements" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "DocumentStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "document_requirements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "app_personal_info_application_id_key" ON "app_personal_info"("application_id");

-- CreateIndex
CREATE UNIQUE INDEX "app_academic_records_application_id_key" ON "app_academic_records"("application_id");

-- CreateIndex
CREATE UNIQUE INDEX "app_test_scores_application_id_key" ON "app_test_scores"("application_id");

-- CreateIndex
CREATE UNIQUE INDEX "app_financial_standing_application_id_key" ON "app_financial_standing"("application_id");

-- CreateIndex
CREATE UNIQUE INDEX "app_extracurriculars_application_id_key" ON "app_extracurriculars"("application_id");

-- CreateIndex
CREATE UNIQUE INDEX "app_family_info_application_id_key" ON "app_family_info"("application_id");

-- CreateIndex
CREATE UNIQUE INDEX "app_supplemental_application_id_key" ON "app_supplemental"("application_id");

-- CreateIndex
CREATE UNIQUE INDEX "app_conduct_agreements_application_id_key" ON "app_conduct_agreements"("application_id");

-- CreateIndex
CREATE INDEX "documents_student_id_idx" ON "documents"("student_id");

-- AddForeignKey
ALTER TABLE "app_personal_info" ADD CONSTRAINT "app_personal_info_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_academic_records" ADD CONSTRAINT "app_academic_records_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_test_scores" ADD CONSTRAINT "app_test_scores_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_financial_standing" ADD CONSTRAINT "app_financial_standing_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_extracurriculars" ADD CONSTRAINT "app_extracurriculars_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_family_info" ADD CONSTRAINT "app_family_info_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_recommenders" ADD CONSTRAINT "app_recommenders_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_supplemental" ADD CONSTRAINT "app_supplemental_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_conduct_agreements" ADD CONSTRAINT "app_conduct_agreements_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_requirement_id_fkey" FOREIGN KEY ("requirement_id") REFERENCES "document_requirements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_requirements" ADD CONSTRAINT "document_requirements_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

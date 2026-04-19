-- CreateEnum
CREATE TYPE "KanbanStage" AS ENUM ('NEW_DOCS', 'PENDING', 'APPLIED', 'ADMITTED', 'VISA_STAGE');

-- AlterTable
ALTER TABLE "student_profiles" ADD COLUMN     "kanban_stage" "KanbanStage" NOT NULL DEFAULT 'PENDING';

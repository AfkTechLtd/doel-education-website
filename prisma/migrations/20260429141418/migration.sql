/*
  Warnings:

  - A unique constraint covering the columns `[requirement_id]` on the table `documents` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "documents_requirement_id_key" ON "documents"("requirement_id");

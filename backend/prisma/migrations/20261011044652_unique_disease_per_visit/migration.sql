/*
  Warnings:

  - A unique constraint covering the columns `[hiveVisitId,diseaseType]` on the table `diseases` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "diseases_hiveVisitId_diseaseType_key" ON "diseases"("hiveVisitId", "diseaseType");

/*
  Warnings:

  - Made the column `phoneNumber` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "phoneNumber" SET NOT NULL;

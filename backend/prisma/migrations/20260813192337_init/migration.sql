-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('BEEKEEPER', 'ADMIN');

-- CreateEnum
CREATE TYPE "HiveType" AS ENUM ('LANGSTROTH', 'NAJAFABADI', 'DADANT', 'TRADITIONAL', 'FOAM', 'OTHER');

-- CreateEnum
CREATE TYPE "HiveStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'MOVED', 'MERGED', 'DESTROYED');

-- CreateEnum
CREATE TYPE "FrameType" AS ENUM ('BROOD', 'HONEY', 'POLLEN', 'EMPTY', 'DRAWN_COMB', 'FOUNDATION', 'OTHER');

-- CreateEnum
CREATE TYPE "QueenBreed" AS ENUM ('CARNIOLAN', 'ITALIAN', 'CAUCASIAN', 'BUCKFAST', 'IRANIAN_NATIVE', 'OTHER');

-- CreateEnum
CREATE TYPE "QueenStatus" AS ENUM ('ACTIVE', 'REPLACED', 'LOST', 'DEAD');

-- CreateEnum
CREATE TYPE "PopulationStatus" AS ENUM ('WEAK', 'MEDIUM', 'STRONG', 'VERY_STRONG');

-- CreateEnum
CREATE TYPE "FeedType" AS ENUM ('SUGAR_SYRUP', 'HONEY', 'SWEET_DOUGH', 'PROTEIN_PATTY', 'POLLEN', 'WATER', 'SUPPLEMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "FeedUnit" AS ENUM ('LITER', 'MILLILITER', 'KILOGRAM', 'GRAM');

-- CreateEnum
CREATE TYPE "DiseaseType" AS ENUM ('AMERICAN_FOULBROOD', 'EUROPEAN_FOULBROOD', 'VARROA', 'NOSEMA', 'CHALKBROOD', 'SACBROOD', 'VIRAL_DISEASE', 'TRACHEAL_MITE', 'WAX_MOTH', 'MALNUTRITION', 'POISONING', 'BEE_EATER', 'OTHER');

-- CreateEnum
CREATE TYPE "DiseaseSeverity" AS ENUM ('MILD', 'MODERATE', 'SEVERE', 'CRITICAL');

-- CreateEnum
CREATE TYPE "TreatmentStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'STOPPED');

-- CreateEnum
CREATE TYPE "DosageUnit" AS ENUM ('MILLILITER', 'LITER', 'GRAM', 'KILOGRAM', 'TABLET', 'CAPSULE', 'DROP', 'SPOON', 'OTHER');

-- CreateEnum
CREATE TYPE "HoneyHarvestUnit" AS ENUM ('KILOGRAM', 'GRAM');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'BEEKEEPER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "apiaries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "latitude" DECIMAL(10,7) NOT NULL,
    "longitude" DECIMAL(10,7) NOT NULL,
    "description" TEXT,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "apiaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hives" (
    "id" TEXT NOT NULL,
    "hiveNumber" TEXT NOT NULL,
    "hiveType" "HiveType" NOT NULL,
    "hiveStatus" "HiveStatus" NOT NULL DEFAULT 'ACTIVE',
    "installationDate" TIMESTAMP(3),
    "notes" TEXT,
    "apiaryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hive_frames" (
    "id" TEXT NOT NULL,
    "frameType" "FrameType" NOT NULL,
    "customFrame" TEXT,
    "count" INTEGER NOT NULL,
    "hiveId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hive_frames_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "queens" (
    "id" TEXT NOT NULL,
    "breed" "QueenBreed" NOT NULL,
    "customBreed" TEXT,
    "birthDate" TIMESTAMP(3),
    "introducedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "status" "QueenStatus" NOT NULL DEFAULT 'ACTIVE',
    "notes" TEXT,
    "hiveId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "queens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hive_visits" (
    "id" TEXT NOT NULL,
    "visitDate" DATE NOT NULL,
    "visitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hasQueen" BOOLEAN NOT NULL DEFAULT false,
    "hasNectar" BOOLEAN NOT NULL DEFAULT false,
    "hasPollen" BOOLEAN NOT NULL DEFAULT false,
    "hasFeed" BOOLEAN NOT NULL DEFAULT false,
    "hasEggs" BOOLEAN NOT NULL DEFAULT false,
    "hasLarvae" BOOLEAN NOT NULL DEFAULT false,
    "hasPupae" BOOLEAN NOT NULL DEFAULT false,
    "populationStatus" "PopulationStatus",
    "hasDisease" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "hiveId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hive_visits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedings" (
    "id" TEXT NOT NULL,
    "feedType" "FeedType" NOT NULL,
    "customFeedType" TEXT,
    "amount" DECIMAL(10,2) NOT NULL,
    "unit" "FeedUnit" NOT NULL,
    "notes" TEXT,
    "hiveVisitId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feedings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diseases" (
    "id" TEXT NOT NULL,
    "diseaseType" "DiseaseType" NOT NULL,
    "customDisease" TEXT,
    "severity" "DiseaseSeverity" NOT NULL,
    "symptoms" TEXT,
    "notes" TEXT,
    "diagnosisDate" DATE NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "hiveVisitId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "diseases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disease_photos" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "caption" TEXT,
    "diseaseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "disease_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "treatments" (
    "id" TEXT NOT NULL,
    "medicineName" TEXT NOT NULL,
    "dosage" DECIMAL(10,2) NOT NULL,
    "dosageUnit" "DosageUnit" NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE,
    "status" "TreatmentStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "notes" TEXT,
    "diseaseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "treatments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "honey_harvests" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "unit" "HoneyHarvestUnit" NOT NULL,
    "harvestDate" DATE NOT NULL,
    "notes" TEXT,
    "hiveId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "honey_harvests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phoneNumber_key" ON "users"("phoneNumber");

-- CreateIndex
CREATE INDEX "apiaries_ownerId_idx" ON "apiaries"("ownerId");

-- CreateIndex
CREATE INDEX "hives_apiaryId_idx" ON "hives"("apiaryId");

-- CreateIndex
CREATE INDEX "hives_hiveStatus_idx" ON "hives"("hiveStatus");

-- CreateIndex
CREATE UNIQUE INDEX "hives_apiaryId_hiveNumber_key" ON "hives"("apiaryId", "hiveNumber");

-- CreateIndex
CREATE INDEX "hive_frames_hiveId_idx" ON "hive_frames"("hiveId");

-- CreateIndex
CREATE UNIQUE INDEX "hive_frames_hiveId_frameType_key" ON "hive_frames"("hiveId", "frameType");

-- CreateIndex
CREATE INDEX "queens_hiveId_idx" ON "queens"("hiveId");

-- CreateIndex
CREATE INDEX "queens_status_idx" ON "queens"("status");

-- CreateIndex
CREATE INDEX "hive_visits_hiveId_idx" ON "hive_visits"("hiveId");

-- CreateIndex
CREATE INDEX "hive_visits_visitDate_idx" ON "hive_visits"("visitDate");

-- CreateIndex
CREATE UNIQUE INDEX "hive_visits_hiveId_visitDate_key" ON "hive_visits"("hiveId", "visitDate");

-- CreateIndex
CREATE INDEX "feedings_hiveVisitId_idx" ON "feedings"("hiveVisitId");

-- CreateIndex
CREATE INDEX "diseases_hiveVisitId_idx" ON "diseases"("hiveVisitId");

-- CreateIndex
CREATE INDEX "diseases_diseaseType_idx" ON "diseases"("diseaseType");

-- CreateIndex
CREATE INDEX "diseases_isActive_idx" ON "diseases"("isActive");

-- CreateIndex
CREATE INDEX "diseases_diagnosisDate_idx" ON "diseases"("diagnosisDate");

-- CreateIndex
CREATE INDEX "disease_photos_diseaseId_idx" ON "disease_photos"("diseaseId");

-- CreateIndex
CREATE INDEX "treatments_diseaseId_idx" ON "treatments"("diseaseId");

-- CreateIndex
CREATE INDEX "treatments_status_idx" ON "treatments"("status");

-- CreateIndex
CREATE INDEX "honey_harvests_hiveId_idx" ON "honey_harvests"("hiveId");

-- CreateIndex
CREATE INDEX "honey_harvests_harvestDate_idx" ON "honey_harvests"("harvestDate");

-- AddForeignKey
ALTER TABLE "apiaries" ADD CONSTRAINT "apiaries_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hives" ADD CONSTRAINT "hives_apiaryId_fkey" FOREIGN KEY ("apiaryId") REFERENCES "apiaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hive_frames" ADD CONSTRAINT "hive_frames_hiveId_fkey" FOREIGN KEY ("hiveId") REFERENCES "hives"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "queens" ADD CONSTRAINT "queens_hiveId_fkey" FOREIGN KEY ("hiveId") REFERENCES "hives"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hive_visits" ADD CONSTRAINT "hive_visits_hiveId_fkey" FOREIGN KEY ("hiveId") REFERENCES "hives"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedings" ADD CONSTRAINT "feedings_hiveVisitId_fkey" FOREIGN KEY ("hiveVisitId") REFERENCES "hive_visits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diseases" ADD CONSTRAINT "diseases_hiveVisitId_fkey" FOREIGN KEY ("hiveVisitId") REFERENCES "hive_visits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disease_photos" ADD CONSTRAINT "disease_photos_diseaseId_fkey" FOREIGN KEY ("diseaseId") REFERENCES "diseases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatments" ADD CONSTRAINT "treatments_diseaseId_fkey" FOREIGN KEY ("diseaseId") REFERENCES "diseases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "honey_harvests" ADD CONSTRAINT "honey_harvests_hiveId_fkey" FOREIGN KEY ("hiveId") REFERENCES "hives"("id") ON DELETE CASCADE ON UPDATE CASCADE;

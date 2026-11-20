-- CreateEnum
CREATE TYPE "CourseStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "BatchStatus" AS ENUM ('DRAFT', 'OPEN', 'CLOSED');

-- CreateEnum
CREATE TYPE "CourseFormat" AS ENUM ('ONLINE', 'OFFLINE');

-- CreateTable
CREATE TABLE "courses" (
    "id" UUID NOT NULL,
    "title" VARCHAR(180) NOT NULL,
    "summary" VARCHAR(4000) NOT NULL,
    "track" VARCHAR(100) NOT NULL,
    "status" "CourseStatus" NOT NULL DEFAULT 'DRAFT',
    "offerings" JSONB NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" UUID NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "location" VARCHAR(240) NOT NULL,
    "capacity" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "batches" (
    "id" UUID NOT NULL,
    "courseId" UUID NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "format" "CourseFormat" NOT NULL,
    "status" "BatchStatus" NOT NULL DEFAULT 'DRAFT',
    "leadMentorId" UUID NOT NULL,
    "assistantMentorId" UUID,
    "roomId" UUID,
    "onlineLocation" VARCHAR(2048),
    "startDate" VARCHAR(10) NOT NULL,
    "repeatDays" INTEGER[],
    "startTime" VARCHAR(5) NOT NULL,
    "endTime" VARCHAR(5) NOT NULL,
    "timeZone" VARCHAR(40) NOT NULL DEFAULT 'Asia/Dhaka',
    "classCount" INTEGER NOT NULL,
    "seats" INTEGER NOT NULL,
    "seatsTaken" INTEGER NOT NULL DEFAULT 0,
    "fee" INTEGER NOT NULL,
    "installmentCounts" INTEGER[],
    "admissionOpen" BOOLEAN NOT NULL DEFAULT false,
    "websiteVisible" BOOLEAN NOT NULL DEFAULT false,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "batches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "batch_classes" (
    "id" UUID NOT NULL,
    "batchId" UUID NOT NULL,
    "sequence" INTEGER NOT NULL,
    "startsAt" TIMESTAMPTZ(3) NOT NULL,
    "endsAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "batch_classes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "courses_status_title_idx" ON "courses"("status", "title");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_name_key" ON "rooms"("name");

-- CreateIndex
CREATE INDEX "batches_status_websiteVisible_admissionOpen_idx" ON "batches"("status", "websiteVisible", "admissionOpen");

-- CreateIndex
CREATE UNIQUE INDEX "batches_courseId_name_key" ON "batches"("courseId", "name");

-- CreateIndex
CREATE INDEX "batch_classes_startsAt_endsAt_idx" ON "batch_classes"("startsAt", "endsAt");

-- CreateIndex
CREATE UNIQUE INDEX "batch_classes_batchId_sequence_key" ON "batch_classes"("batchId", "sequence");

-- AddForeignKey
ALTER TABLE "batches" ADD CONSTRAINT "batches_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "batches" ADD CONSTRAINT "batches_leadMentorId_fkey" FOREIGN KEY ("leadMentorId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "batches" ADD CONSTRAINT "batches_assistantMentorId_fkey" FOREIGN KEY ("assistantMentorId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "batches" ADD CONSTRAINT "batches_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "batch_classes" ADD CONSTRAINT "batch_classes_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "batches"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Backstop application validation for capacity and money invariants.
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_capacity_check" CHECK ("capacity" > 0);
ALTER TABLE "batches" ADD CONSTRAINT "batch_capacity_check" CHECK ("seats" > 0 AND "seatsTaken" >= 0 AND "seatsTaken" <= "seats");
ALTER TABLE "batches" ADD CONSTRAINT "batch_fee_check" CHECK ("fee" >= 0 AND "fee" <= 10000000);
ALTER TABLE "batches" ADD CONSTRAINT "batch_class_count_check" CHECK ("classCount" BETWEEN 1 AND 200);
ALTER TABLE "batches" ADD CONSTRAINT "batch_admission_check" CHECK (NOT "admissionOpen" OR "status" = 'OPEN');
ALTER TABLE "batch_classes" ADD CONSTRAINT "batch_class_time_check" CHECK ("endsAt" > "startsAt" AND "sequence" > 0);

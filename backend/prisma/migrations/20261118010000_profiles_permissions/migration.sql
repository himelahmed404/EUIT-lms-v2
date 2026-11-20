-- CreateEnum
CREATE TYPE "BatchScope" AS ENUM ('ALL', 'ASSIGNED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Role" ADD VALUE 'OWNER';
ALTER TYPE "Role" ADD VALUE 'ADMIN';
ALTER TYPE "Role" ADD VALUE 'ACCOUNTS';
ALTER TYPE "Role" ADD VALUE 'ADMISSIONS';
ALTER TYPE "Role" ADD VALUE 'MENTOR';
ALTER TYPE "Role" ADD VALUE 'CUSTOM';

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "address" VARCHAR(500),
ADD COLUMN     "batch_ids" UUID[] DEFAULT ARRAY[]::UUID[],
ADD COLUMN     "batch_scope" "BatchScope",
ADD COLUMN     "bio" VARCHAR(2000),
ADD COLUMN     "custom_role_id" UUID,
ADD COLUMN     "education" VARCHAR(200),
ADD COLUMN     "emergency_contact" VARCHAR(24),
ADD COLUMN     "job_title" VARCHAR(120),
ADD COLUMN     "occupation" VARCHAR(120),
ADD COLUMN     "phone" VARCHAR(24),
ADD COLUMN     "photo_asset_id" UUID,
ADD COLUMN     "portfolio_url" VARCHAR(2048),
ADD COLUMN     "show_on_website" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "skills" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "years_of_experience" INTEGER;

-- CreateTable
CREATE TABLE "role_definitions" (
    "id" UUID NOT NULL,
    "key" VARCHAR(80) NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "system" BOOLEAN NOT NULL DEFAULT false,
    "permissions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "default_batch_scope" "BatchScope" NOT NULL DEFAULT 'ASSIGNED',

    CONSTRAINT "role_definitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile_preferences" (
    "profile_id" UUID NOT NULL,
    "email_notifications" BOOLEAN NOT NULL DEFAULT true,
    "sms_notifications" BOOLEAN NOT NULL DEFAULT true,
    "leaderboard_visible" BOOLEAN NOT NULL DEFAULT true,
    "class_reminders" BOOLEAN NOT NULL DEFAULT true,
    "payment_reminders" BOOLEAN NOT NULL DEFAULT true,
    "learning_updates" BOOLEAN NOT NULL DEFAULT true,
    "marketing_emails" BOOLEAN NOT NULL DEFAULT false,
    "project_submissions" BOOLEAN NOT NULL DEFAULT true,
    "student_questions" BOOLEAN NOT NULL DEFAULT true,
    "recording_reminders" BOOLEAN NOT NULL DEFAULT true,
    "course_review_updates" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "profile_preferences_pkey" PRIMARY KEY ("profile_id")
);

-- CreateTable
CREATE TABLE "uploaded_assets" (
    "id" UUID NOT NULL,
    "owner_id" UUID NOT NULL,
    "storage_key" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mime_type" TEXT NOT NULL,
    "ready" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "uploaded_assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_events" (
    "id" UUID NOT NULL,
    "actor_id" UUID NOT NULL,
    "target_id" UUID NOT NULL,
    "action" VARCHAR(80) NOT NULL,
    "before" JSONB NOT NULL,
    "after" JSONB NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "role_definitions_key_key" ON "role_definitions"("key");

-- CreateIndex
CREATE UNIQUE INDEX "uploaded_assets_storage_key_key" ON "uploaded_assets"("storage_key");

-- CreateIndex
CREATE INDEX "audit_events_target_id_created_at_idx" ON "audit_events"("target_id", "created_at");

-- AddForeignKey
ALTER TABLE "profile_preferences" ADD CONSTRAINT "profile_preferences_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "uploaded_assets" ADD CONSTRAINT "uploaded_assets_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_events" ADD CONSTRAINT "audit_events_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_custom_role_id_fkey" FOREIGN KEY ("custom_role_id") REFERENCES "role_definitions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_photo_asset_id_fkey" FOREIGN KEY ("photo_asset_id") REFERENCES "uploaded_assets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

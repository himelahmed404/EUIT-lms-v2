CREATE TYPE "Role" AS ENUM ('STUDENT');
CREATE TABLE "profiles" (
  "id" UUID NOT NULL,
  "firebase_uid" VARCHAR(128) NOT NULL,
  "full_name" VARCHAR(120) NOT NULL,
  "role" "Role" NOT NULL DEFAULT 'STUDENT',
  "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "profiles_firebase_uid_key" ON "profiles"("firebase_uid");

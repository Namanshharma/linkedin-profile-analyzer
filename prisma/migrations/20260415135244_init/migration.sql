-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'processing', 'completed', 'failed');

-- CreateTable
CREATE TABLE "analysis_requests" (
    "id" TEXT NOT NULL,
    "profile_url" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "analysis_requests_pkey" PRIMARY KEY ("id")
);

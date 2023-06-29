/*
  Warnings:

  - Changed the type of `status` on the `TaskProgress` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TaskProgressStatus" AS ENUM ('not_started', 'pending_review', 'completed');

-- AlterTable
ALTER TABLE "TaskProgress" DROP COLUMN "status",
ADD COLUMN     "status" "TaskProgressStatus" NOT NULL;

-- DropEnum
DROP TYPE "TaskStatus";

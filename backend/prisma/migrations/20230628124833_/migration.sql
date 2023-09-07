-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('not_started', 'pending_review', 'completed');

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskProgress" (
    "id" TEXT NOT NULL,
    "task_id" TEXT NOT NULL,
    "participant_id" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL,

    CONSTRAINT "TaskProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TaskProgress_participant_id_key" ON "TaskProgress"("participant_id");

-- AddForeignKey
ALTER TABLE "TaskProgress" ADD CONSTRAINT "TaskProgress_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskProgress" ADD CONSTRAINT "TaskProgress_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - A unique constraint covering the columns `[task_id,participant_id]` on the table `TaskProgress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TaskProgress_task_id_participant_id_key" ON "TaskProgress"("task_id", "participant_id");

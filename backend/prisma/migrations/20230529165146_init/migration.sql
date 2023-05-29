-- CreateEnum
CREATE TYPE "ParticipantStatus" AS ENUM ('participating', 'adjourning', 'withdrawn');

-- CreateTable
CREATE TABLE "Participant" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "status" "ParticipantStatus" NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participant.email_unique" ON "Participant"("email");

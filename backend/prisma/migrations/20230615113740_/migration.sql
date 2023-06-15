-- CreateTable
CREATE TABLE "Pair" (
    "id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Pair_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PairMember" (
    "id" TEXT NOT NULL,
    "participant_id" TEXT NOT NULL,
    "pair_id" TEXT NOT NULL,

    CONSTRAINT "PairMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PairMember_participant_id_key" ON "PairMember"("participant_id");

-- AddForeignKey
ALTER TABLE "Pair" ADD CONSTRAINT "Pair_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PairMember" ADD CONSTRAINT "PairMember_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PairMember" ADD CONSTRAINT "PairMember_pair_id_fkey" FOREIGN KEY ("pair_id") REFERENCES "Pair"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

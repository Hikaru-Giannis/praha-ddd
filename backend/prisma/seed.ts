import { PrismaClient, ParticipantStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const participant1 = await prisma.participant.create({
    data: {
      name: 'Participant 1',
      email: 'participant1@example.com',
      status: ParticipantStatus.participating,
    },
  })

  const participant2 = await prisma.participant.create({
    data: {
      name: 'Participant 2',
      email: 'participant2@example.com',
      status: ParticipantStatus.adjourning,
    },
  })

  const participant3 = await prisma.participant.create({
    data: {
      name: 'Participant 3',
      email: 'participant3@example.com',
      status: ParticipantStatus.withdrawn,
    },
  })

  console.log({ participant1, participant2, participant3 })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

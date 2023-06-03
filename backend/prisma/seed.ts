import { PrismaClient, ParticipantStatus } from '@prisma/client'
import { uuid } from 'uuidv4'

const prisma = new PrismaClient()

async function main() {
  // 30人分のダミーデータを作成
  const participants = Array.from({ length: 30 }).map((_, i) => ({
    id: uuid(),
    name: `Participant ${i + 1}`,
    email: `participant${i}` + '@example.com',
    status: ParticipantStatus.participating,
  }))

  // 非同期対応
  await Promise.all(
    participants.map(async (participant) => {
      await prisma.participant.create({
        data: participant,
      })
    }),
  )
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

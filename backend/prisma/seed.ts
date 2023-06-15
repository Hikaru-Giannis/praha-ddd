import { PrismaClient, ParticipantStatus, TeamStatus } from '@prisma/client'
import { ulid } from 'ulid'

const prisma = new PrismaClient()

async function main() {
  // 30人分のダミーデータを作成
  const participants = Array.from({ length: 30 }).map((_, i) => ({
    id: ulid(),
    name: `Participant ${i + 1}`,
    email: `participant${i}` + '@example.com',
    status: ParticipantStatus.participating,
  }))

  // 作成したデータをDBに保存
  await prisma.participant.createMany({
    data: participants,
  })

  // 5チーム分のダミーデータを作成
  // 名前は数字のみ、3文字以下、昇順
  const teams = Array.from({ length: 5 }).map((_, i) => ({
    id: ulid(),
    name: `${i + 1}`,
    status: TeamStatus.active,
  }))

  // 作成したデータをDBに保存
  await prisma.team.createMany({
    data: teams,
  })

  // 作成したチームに参加者を割り当てる
  // 1チームに6人ずつ割り当てる
  const teamMembers = teams.flatMap((team) => {
    const teamMembers = participants.splice(0, 6).map((participant) => ({
      id: ulid(),
      participant_id: participant.id,
      team_id: team.id,
    }))
    return teamMembers
  })

  // 作成したデータをDBに保存
  await prisma.teamMember.createMany({
    data: teamMembers,
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

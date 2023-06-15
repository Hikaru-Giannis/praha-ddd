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

  // 1チームに2ペアとして12ペアを作成
  // ペア名は英字で、昇順
  const names = Array.from({ length: 12 }).map((_, i) =>
    String.fromCharCode(65 + i),
  )
  const pairs = teams.flatMap((team) => {
    const pairs = participants.splice(0, 12).map((participant) => ({
      id: ulid(),
      team_id: team.id,
      participant_id: participant.id,
      name: String(names.shift()),
    }))
    return pairs
  })

  // 作成したデータをDBに保存
  await prisma.pair.createMany({
    data: pairs,
  })

  // 作成したペアに参加者を割り当てる
  // 1ペアに3人ずつ割り当てる
  const pairMembers = pairs.flatMap((pair) => {
    const pairMembers = participants.splice(0, 3).map((participant) => ({
      id: ulid(),
      participant_id: participant.id,
      pair_id: pair.id,
    }))
    return pairMembers
  })

  // 作成したデータをDBに保存
  await prisma.pairMember.createMany({
    data: pairMembers,
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

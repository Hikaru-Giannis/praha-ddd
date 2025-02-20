import { PrismaClient, ParticipantStatus, TeamStatus } from '@prisma/client'
import { ulid } from 'ulid'

const prisma = new PrismaClient()

const lastNames = ['佐藤', '鈴木', '高橋', '田中', '渡辺']

const firstNames = ['太郎', '次郎', '三郎', '四郎', '五郎', '六郎']

async function main() {
  // 30人分のダミーデータを作成
  // 名前はランダムに組み合わせる
  const participants = Array.from({ length: 30 }).map((_, i) => ({
    id: ulid(),
    name: `${lastNames[i % 5]} ${firstNames[i % 6]}`,
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

  const teamMemberParticipants = [...participants]

  // 作成したチームに参加者を割り当てる
  // 1チームに6人ずつ割り当てる
  const teamMembers = teams.flatMap((team) => {
    const teamMembers = teamMemberParticipants
      .splice(0, 6)
      .map((participant) => ({
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

  // 1チームに2ペアとして10ペアを作成
  const pairNames = ['A', 'B']

  // ペア名は英字で、1チーム内で毎回昇順から割り当てる
  // 例 ) 1-A, 1-B, 2-A, 2-B, 3-A, 3-B, ...
  const pairs = teams.flatMap((team) => {
    const pairs = pairNames.map((name) => ({
      id: ulid(),
      name,
      team_id: team.id,
    }))
    return pairs
  })

  // 作成したデータをDBに保存
  await prisma.pair.createMany({
    data: pairs,
  })

  // 作成したペアに参加者を割り当てる
  // 1ペアに3人ずつ割り当てる
  const pairParticipants = [...participants]
  const pairMembers = pairs.flatMap((pair) => {
    const pairMembers = pairParticipants.splice(0, 3).map((participant) => {
      return {
        id: ulid(),
        participant_id: participant.id,
        pair_id: pair.id,
      }
    })
    return pairMembers
  })

  // 作成したデータをDBに保存
  await prisma.pairMember.createMany({
    data: pairMembers,
  })

  // 課題を80個作成
  const tasks = Array.from({ length: 80 }).map((_, i) => ({
    id: ulid(),
    name: `Task ${i + 1}`,
  }))

  // 作成したデータをDBに保存
  await prisma.task.createMany({
    data: tasks,
  })

  // 参加者に課題を割り当てる
  const participantTasks = participants.flatMap((participant) => {
    const participantTasks = tasks.map((task) => ({
      id: ulid(),
      participant_id: participant.id,
      task_id: task.id,
      status: 'not_started' as const,
    }))
    return participantTasks
  })

  // 作成したデータをDBに保存
  await prisma.taskProgress.createMany({
    data: participantTasks,
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

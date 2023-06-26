import { IPairRepository } from './pair.repository'
import { Participant } from '../participant/participant'
import { Team } from '../team/team'
import { PairMember } from './pair-member'
import { Pair } from './pair'

export class AssignPairService {
  constructor(private readonly pairRepository: IPairRepository) {}

  public async assign(participant: Participant, team: Team): Promise<Pair[]> {
    // ペアを割り当てる
    const pairs = await this.pairRepository.fetchByTeamId(team.id)

    // 一番ペアメンバー数が少ないペアを選択する
    const minMembersCount = Math.min(
      ...pairs.map((pair) => pair.pairMembersCount),
    )
    const minMembersPairs = pairs.filter(
      (pair) => pair.pairMembersCount === minMembersCount,
    )

    const chosenPair =
      minMembersPairs[Math.floor(Math.random() * minMembersPairs.length)]
    if (chosenPair) {
      // ペアが満員の場合は新しいペアを作成して、分割する
      if (chosenPair.isFull) {
        // 最新のペアの名前を取得する
        const latestPair = pairs[pairs.length - 1]
        if (!latestPair) {
          throw new Error('最新のペアの取得に失敗しました')
        }
        const newPairMember = PairMember.create({
          participantId: participant.id,
        })
        const [pair, newPairMembers] = chosenPair.dividePair(newPairMember)
        const newPair = Pair.create({
          teamId: team.id.value,
          pairMembers: newPairMembers,
          latestPair,
        })
        const newPairs = [pair, newPair]
        return newPairs
      }

      // ペアに参加者を追加する
      const pairMember = PairMember.create({
        participantId: participant.id,
      })
      const newPair = chosenPair.assignPairMember(pairMember)
      return [newPair]
    }

    throw new Error('ペアの割り当てに失敗しました')
  }
}

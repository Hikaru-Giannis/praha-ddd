import { IPairRepository } from './pair.repository'
import { Participant } from '../participant/participant'
import { Team } from '../team/team'
import { PairMember } from './pair-member'

export class AssignPairService {
  constructor(private readonly pairRepository: IPairRepository) {}

  public async assign(participant: Participant, team: Team) {
    // ペアを割り当てる
    const pairs = await this.pairRepository.fetchByTeamId(team.id)

    // 一番ペアメンバー数が少ないペアを選択する
    pairs.sort((a, b) => a.pairMembersCount - b.pairMembersCount)
    const pair = pairs[0]
    if (pair) {
      // ペアに参加者を追加する
      const pairMember = PairMember.create({
        pairId: pair.id,
        participantId: participant.id,
      })
      const newPair = pair.assignPairMember(pairMember)
      await this.pairRepository.save(newPair)
    }
  }
}

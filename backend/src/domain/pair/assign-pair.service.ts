import { IPairRepository } from './pair.repository'
import { Participant } from '../participant/participant'
import { PairMember } from './pair-member'
import { Pair } from './pair'
import { Inject } from '@nestjs/common'
import { tokens } from 'src/tokens'
import { ITeamRepository } from '../team/team.repository'
import { DomainException } from '../error/domain.exception'
import { NoPairFoundToAssignException } from './no-pair-found-to-assign.exception'

export class AssignPairService {
  constructor(
    @Inject(tokens.ITeamRepository)
    private readonly teamRepository: ITeamRepository,
    @Inject(tokens.IPairRepository)
    private readonly pairRepository: IPairRepository,
  ) {}

  public async assign(participant: Participant): Promise<void> {
    const team = await this.teamRepository.findByParticipantId(participant.id)
    if (!team) {
      throw new DomainException(
        '参加者が所属しているチームが見つかりませんでした',
      )
    }
    const pairs = await this.pairRepository.findManyByTeamId(team.id)

    // ペア内の最小参加数を取得
    const minMembersCount = Math.min(
      ...pairs.map((pair) => pair.pairMembersCount),
    )
    // 最小参加数のペアを取得
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
          throw new DomainException('最新のペアの取得に失敗しました')
        }
        const newPairMember = PairMember.create({
          participantId: participant.id,
        })
        const [pair, newPairMembers] = chosenPair.dividePair(newPairMember)
        const newPair = Pair.create({
          teamId: team.id,
          pairMembers: newPairMembers,
          latestPair,
        })
        await this.pairRepository.save(newPair)
        await this.pairRepository.save(pair)
        return
      }

      // ペアに参加者を追加する
      const pairMember = PairMember.create({
        participantId: participant.id,
      })
      const newPair = chosenPair.assignPairMember(pairMember)
      await this.pairRepository.save(newPair)
      return
    }

    throw new NoPairFoundToAssignException(
      '割り当てるペアが見つかりませんでした',
    )
  }
}

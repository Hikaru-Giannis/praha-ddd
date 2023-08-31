import { createRandomIdString } from 'src/util/random'
import { PairName } from './PairName'
import { PairMember } from './pair-member'
import { ParticipantId } from '../participant/ParticipantId'
import { TeamId } from '../team/TeamId'
import { PairId } from './PairId'
import { DomainException } from '../error/domain.exception'

type CreateProps = {
  teamId: TeamId
  pairMembers: PairMember[]
  latestPair: Pair | undefined
}

type ReconstructProps = {
  id: string
  teamId: string
  pairName: PairName
  pairMembers: PairMember[]
}

export class Pair {
  private MAX_PAIR_MEMBER_COUNT = 3
  private MIN_PAIR_MEMBER_COUNT = 2

  private constructor(
    public readonly id: PairId,
    public readonly teamId: TeamId,
    private readonly pairName: PairName,
    private readonly pairMembers: PairMember[] = [],
  ) {
    this.id = id
    this.teamId = teamId
    this.pairName = pairName
    this.pairMembers = pairMembers
  }

  static create({ teamId, pairMembers, latestPair }: CreateProps) {
    const newPairName = latestPair ? latestPair.pairName.next : PairName.first
    return new Pair(
      new PairId(createRandomIdString()),
      teamId,
      newPairName,
      pairMembers,
    )
  }

  static reconstruct({ id, teamId, pairName, pairMembers }: ReconstructProps) {
    return new Pair(new PairId(id), new TeamId(teamId), pairName, pairMembers)
  }

  public equals(pair: Pair): boolean {
    return this.id.equals(pair.id)
  }

  public getAllProperties() {
    return {
      id: this.id.value,
      teamId: this.teamId,
      pairName: this.pairName,
      pairMembers: this.pairMembers.map(
        (pairMember) => pairMember.getAllProperties,
      ),
    }
  }

  public get pairMembersCount(): number {
    return this.pairMembers.length
  }

  public get isFull(): boolean {
    return this.pairMembersCount === this.MAX_PAIR_MEMBER_COUNT
  }

  public dividePair(pairMember: PairMember): [Pair, [PairMember, PairMember]] {
    if (this.isFull === false) {
      throw new DomainException('ペアメンバーが満たされていません')
    }

    // 現状のメンバーからランダムに1人を選択する
    const randomPairMember = this.pairMembers[
      Math.floor(Math.random() * this.pairMembers.length)
    ]

    if (!randomPairMember) {
      throw new DomainException('ペアメンバーが見つかりませんでした')
    }

    return [
      new Pair(
        this.id,
        this.teamId,
        this.pairName,
        this.pairMembers.filter(
          (pairMember) => pairMember.id !== randomPairMember.id,
        ),
      ),
      [pairMember, randomPairMember],
    ]
  }

  public assignPairMember(pairMember: PairMember): Pair {
    if (this.pairMembersCount >= this.MAX_PAIR_MEMBER_COUNT) {
      throw new DomainException('ペアメンバーが満たされています')
    }

    return new Pair(this.id, this.teamId, this.pairName, [
      ...this.pairMembers,
      pairMember,
    ])
  }

  public changeTeam(teamId: TeamId): Pair {
    return new Pair(this.id, teamId, this.pairName, this.pairMembers)
  }

  public hasPairMember(participantId: ParticipantId): boolean {
    return this.pairMembers.some((member) => member.equals(participantId))
  }

  public movePairMember(participantId: ParticipantId): [Pair, PairMember] {
    if (this.isFull === false) {
      throw new DomainException('ペアメンバーが満たされていません')
    }

    const pairMember = this.pairMembers.find((member) =>
      member.equals(participantId),
    )

    if (!pairMember) {
      throw new DomainException('ペアメンバーが見つかりませんでした')
    }

    return [
      new Pair(
        this.id,
        this.teamId,
        this.pairName,
        this.pairMembers.filter((member) => !member.equals(participantId)),
      ),
      pairMember,
    ]
  }

  get isActive(): boolean {
    return (
      this.pairMembersCount >= this.MIN_PAIR_MEMBER_COUNT &&
      this.pairMembersCount <= this.MAX_PAIR_MEMBER_COUNT
    )
  }

  public removePairMember(participantId: ParticipantId): Pair {
    return new Pair(
      this.id,
      this.teamId,
      this.pairName,
      this.pairMembers.filter((member) => !member.equals(participantId)),
    )
  }

  public isBelongTo(teamId: TeamId): boolean {
    return this.teamId.equals(teamId)
  }
}

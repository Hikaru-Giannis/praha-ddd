import { createRandomIdString } from 'src/util/random'
import { PairName } from './PairName'
import { PairMember } from './pair-member'
import { ParticipantId } from '../participant/ParticipantId'

type CreateProps = {
  teamId: string
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
  private MaxPairMembersCount = 3

  private constructor(
    public readonly id: string,
    private readonly teamId: string,
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
    return new Pair(createRandomIdString(), teamId, newPairName, pairMembers)
  }

  static reconstruct({ id, teamId, pairName, pairMembers }: ReconstructProps) {
    return new Pair(id, teamId, pairName, pairMembers)
  }

  public equals(pair: Pair): boolean {
    return this.id === pair.id
  }

  public get getAllProperties() {
    return {
      id: this.id,
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
    return this.pairMembersCount >= this.MaxPairMembersCount
  }

  public dividePair(pairMember: PairMember): [Pair, [PairMember, PairMember]] {
    if (this.isFull === false) {
      throw new Error('Insufficient number of pair members.')
    }

    // 現状のメンバーからランダムに1人を選択する
    const randomPairMember = this.pairMembers[
      Math.floor(Math.random() * this.pairMembers.length)
    ]

    if (!randomPairMember) {
      throw new Error('No pair member found.')
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
    if (this.pairMembersCount >= this.MaxPairMembersCount) {
      throw new Error('Over the maximum number of pair members.')
    }

    return new Pair(this.id, this.teamId, this.pairName, [
      ...this.pairMembers,
      pairMember,
    ])
  }

  public changeTeam(teamId: string): Pair {
    return new Pair(this.id, teamId, this.pairName, this.pairMembers)
  }

  public hasPairMember(participantId: ParticipantId): boolean {
    return this.pairMembers.some((member) => member.equals(participantId))
  }

  public movePairMember(participantId: ParticipantId): [Pair, PairMember] {
    if (this.isFull === false) {
      throw new Error('Insufficient number of pair members.')
    }

    const pairMember = this.pairMembers.find((member) =>
      member.equals(participantId),
    )

    if (!pairMember) {
      throw new Error('Not found pair member.')
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
}

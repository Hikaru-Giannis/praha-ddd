import { createRandomIdString } from 'src/util/random'
import { PairName } from './PairName'
import { PairMember } from './pair-member'

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
      throw new Error('人数が不足しています。')
    }

    // 現状のメンバーからランダムに1人を選択する
    const randomPairMember = this.pairMembers[
      Math.floor(Math.random() * this.pairMembers.length)
    ]

    if (!randomPairMember) {
      throw new Error('ペアメンバーが存在しません')
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
    // 3人以上のペアには参加者を追加できない
    if (this.pairMembersCount >= this.MaxPairMembersCount) {
      throw new Error('3人以上のペアには参加者を追加できません')
    }

    return new Pair(this.id, this.teamId, this.pairName, [
      ...this.pairMembers,
      pairMember,
    ])
  }
}

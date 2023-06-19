import { createRandomIdString } from 'src/util/random'
import { PairName } from './PairName'
import { PairMember } from './pair-member'

type PairCreateProps = {
  teamId: string
  pairName: PairName
  pairMembers: PairMember[]
}

type PairReconstructProps = {
  id: string
  teamId: string
  pairName: PairName
}

export class Pair {
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

  static create({ teamId, pairName, pairMembers }: PairCreateProps) {
    return new Pair(createRandomIdString(), teamId, pairName, pairMembers)
  }

  static reconstruct({ id, teamId, pairName }: PairReconstructProps) {
    return new Pair(id, teamId, pairName)
  }

  public get getAllProperties() {
    return {
      id: this.id,
      teamId: this.teamId,
      pairName: this.pairName,
      pairMembers: this.pairMembers,
    }
  }

  public get pairMembersCount(): number {
    return this.pairMembers.length
  }

  public assignPairMember(pairMember: PairMember): Pair {
    return new Pair(this.id, this.teamId, this.pairName, [
      ...this.pairMembers,
      pairMember,
    ])
  }
}

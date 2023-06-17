import { createRandomIdString } from 'src/util/random'
import { PairName } from './PairName'

type PairCreateProps = {
  teamId: string
  pairName: string
}

export class Pair {
  private constructor(
    private readonly id: string,
    private readonly teamId: string,
    private readonly pairName: PairName,
  ) {
    this.id = id
    this.teamId = teamId
    this.pairName = pairName
  }

  static create({ teamId, pairName }: PairCreateProps) {
    return new Pair(createRandomIdString(), teamId, new PairName(pairName))
  }
}

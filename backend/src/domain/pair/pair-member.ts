import { createRandomIdString } from 'src/util/random'

type createPairMemberProps = {
  pairId: string
  participantId: string
}

type reconstructPairMemberProps = {
  id: string
  pairId: string
  participantId: string
}

export class PairMember {
  private constructor(
    private readonly id: string,
    private readonly pairId: string,
    private readonly participantId: string,
  ) {}

  static create({ pairId, participantId }: createPairMemberProps) {
    return new PairMember(createRandomIdString(), pairId, participantId)
  }

  static reconstruct({
    id,
    pairId,
    participantId,
  }: reconstructPairMemberProps) {
    return new PairMember(id, pairId, participantId)
  }

  public get getAllProperties() {
    return {
      id: this.id,
      pairId: this.pairId,
      participantId: this.participantId,
    }
  }
}

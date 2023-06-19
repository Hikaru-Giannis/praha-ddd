import { createRandomIdString } from 'src/util/random'

type createPairMemberProps = {
  participantId: string
}

type reconstructPairMemberProps = {
  id: string
  participantId: string
}

export class PairMember {
  private constructor(
    public readonly id: string,
    private readonly participantId: string,
  ) {}

  static create({ participantId }: createPairMemberProps) {
    return new PairMember(createRandomIdString(), participantId)
  }

  static reconstruct({ id, participantId }: reconstructPairMemberProps) {
    return new PairMember(id, participantId)
  }

  public get getAllProperties() {
    return {
      id: this.id,
      participantId: this.participantId,
    }
  }
}

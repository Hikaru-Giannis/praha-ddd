import { createRandomIdString } from 'src/util/random'

type CreatePairMemberProps = {
  participantId: string
}

type ReconstructPairMemberProps = {
  id: string
  participantId: string
  teamId: string
}

export class PairMember {
  private constructor(
    public readonly id: string,
    private readonly participantId: string,
  ) {}

  static create({ participantId }: CreatePairMemberProps) {
    return new PairMember(createRandomIdString(), participantId)
  }

  static reconstruct({ id, participantId }: ReconstructPairMemberProps) {
    return new PairMember(id, participantId)
  }

  public get getAllProperties() {
    return {
      id: this.id,
      participantId: this.participantId,
    }
  }

  public equals(participantId: string): boolean {
    return this.participantId === participantId
  }
}

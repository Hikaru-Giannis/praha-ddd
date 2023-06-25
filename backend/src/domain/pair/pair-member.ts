import { createRandomIdString } from 'src/util/random'

type CreateProps = {
  participantId: string
}

type ReconstructProps = {
  id: string
  participantId: string
  teamId: string
}

export class PairMember {
  private constructor(
    public readonly id: string,
    private readonly participantId: string,
  ) {}

  static create({ participantId }: CreateProps) {
    return new PairMember(createRandomIdString(), participantId)
  }

  static reconstruct({ id, participantId }: ReconstructProps) {
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

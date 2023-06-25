import { createRandomIdString } from 'src/util/random'
import { ParticipantId } from '../participant/ParticipantId'

type CreateProps = {
  participantId: ParticipantId
}

type ReconstructProps = {
  id: string
  participantId: ParticipantId
  teamId: string
}

export class PairMember {
  private constructor(
    public readonly id: string,
    private readonly participantId: ParticipantId,
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

  public equals(participantId: ParticipantId): boolean {
    return this.participantId.equals(participantId)
  }
}

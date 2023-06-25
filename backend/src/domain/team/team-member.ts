import { createRandomIdString } from 'src/util/random'
import { ParticipantId } from '../participant/ParticipantId'

type CreateProps = {
  participantId: ParticipantId
}

type ReconstructProps = {
  id: string
  participantId: ParticipantId
}

export class TeamMember {
  private constructor(
    public readonly id: string,
    public readonly participantId: ParticipantId,
  ) {}

  static create({ participantId }: CreateProps) {
    return new TeamMember(createRandomIdString(), participantId)
  }

  static reconstruct({ id, participantId }: ReconstructProps) {
    return new TeamMember(id, participantId)
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

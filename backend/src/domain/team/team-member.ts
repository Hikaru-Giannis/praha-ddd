import { createRandomIdString } from 'src/util/random'
import { ParticipantId } from '../participant/ParticipantId'

type CreateProps = {
  participantId: ParticipantId
}

type ReconstructProps = {
  id: string
  participantId: string
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
    return new TeamMember(id, new ParticipantId(participantId))
  }

  public get getAllProperties() {
    return {
      id: this.id,
      participantId: this.participantId.value,
    }
  }

  public equals(participantId: ParticipantId): boolean {
    return this.participantId.equals(participantId)
  }
}

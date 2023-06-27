import { createRandomIdString } from 'src/util/random'
import { ParticipantId } from '../participant/ParticipantId'
import { PairMemeberId } from './PairMemeberId'

type CreateProps = {
  participantId: ParticipantId
}

type ReconstructProps = {
  id: string
  participantId: string
}

export class PairMember {
  private constructor(
    public readonly id: PairMemeberId,
    private readonly participantId: ParticipantId,
  ) {}

  static create({ participantId }: CreateProps) {
    return new PairMember(
      new PairMemeberId(createRandomIdString()),
      participantId,
    )
  }

  static reconstruct({ id, participantId }: ReconstructProps) {
    return new PairMember(
      new PairMemeberId(id),
      new ParticipantId(participantId),
    )
  }

  public get getAllProperties() {
    return {
      id: this.id.value,
      participantId: this.participantId.value,
    }
  }

  public equals(participantId: ParticipantId): boolean {
    return this.participantId.equals(participantId)
  }
}

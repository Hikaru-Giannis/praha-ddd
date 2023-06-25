import { createRandomIdString } from 'src/util/random'
import { ParticipantStatus, ParticipantStatusType } from './ParticipantStatus'
import { ParticipantId } from './ParticipantId'
import { ParticipantName } from './ParticipantName'

type CreateProps = {
  name: string
  email: string
}

type ReconstructProps = {
  id: string
  name: string
  email: string
  status: ParticipantStatusType
}

export class Participant {
  private constructor(
    public readonly id: ParticipantId,
    private readonly name: ParticipantName,
    public readonly email: string,
    private readonly status: ParticipantStatus,
  ) {}

  static create({ name, email }: CreateProps) {
    return new Participant(
      new ParticipantId(createRandomIdString()),
      new ParticipantName(name),
      email,
      ParticipantStatus.participating(),
    )
  }

  // インフラ層で実装
  static reconstruct({ id, name, email, status }: ReconstructProps) {
    return new Participant(
      new ParticipantId(id),
      new ParticipantName(name),
      email,
      new ParticipantStatus(status),
    )
  }

  // インフラ層のみで利用
  public getAllProperties() {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email,
      status: this.status.value,
    }
  }

  public changeStatus(status: ParticipantStatusType): Participant {
    return new Participant(
      this.id,
      this.name,
      this.email,
      new ParticipantStatus(status),
    )
  }
}

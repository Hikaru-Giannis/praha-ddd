import { createRandomIdString } from 'src/util/random'
import { ParticipantStatus, ParticipantStatusType } from './ParticipantStatus'

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
    public readonly id: string,
    private readonly name: string,
    public readonly email: string,
    private readonly status: ParticipantStatus,
  ) {}

  static create({ name, email }: CreateProps) {
    return new Participant(
      createRandomIdString(),
      name,
      email,
      ParticipantStatus.participating(),
    )
  }

  // インフラ層で実装
  static reconstruct({ id, name, email, status }: ReconstructProps) {
    return new Participant(id, name, email, new ParticipantStatus(status))
  }

  // インフラ層のみで利用
  public getAllProperties() {
    return {
      id: this.id,
      name: this.name,
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

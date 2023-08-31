import { createRandomIdString } from 'src/util/random'
import { ParticipantStatus, ParticipantStatusType } from './ParticipantStatus'
import { ParticipantId } from './ParticipantId'
import { ParticipantName } from './ParticipantName'
import { Email } from './Email'
import { DomainException } from '../error/domain.exception'

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
    public readonly email: Email,
    private readonly status: ParticipantStatus,
  ) {}

  static create({ name, email }: CreateProps) {
    return new Participant(
      new ParticipantId(createRandomIdString()),
      new ParticipantName(name),
      new Email(email),
      ParticipantStatus.participating(),
    )
  }

  // インフラ層で実装
  static reconstruct({ id, name, email, status }: ReconstructProps) {
    return new Participant(
      new ParticipantId(id),
      new ParticipantName(name),
      new Email(email),
      new ParticipantStatus(status),
    )
  }

  // インフラ層のみで利用
  public getAllProperties() {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      status: this.status.value,
    }
  }

  get isParticipating() {
    return this.status.isParticipating
  }

  get isAdjourning() {
    return this.status.isAdjourning
  }

  get isWithdrawn() {
    return this.status.isWithdrawn
  }

  public changeStatus(status: ParticipantStatusType): Participant {
    if (this.isWithdrawn) {
      throw new DomainException('既に退会済みです')
    }
    if (this.status.value === status) {
      throw new DomainException('同じ状態に変更することはできません')
    }
    return new Participant(
      this.id,
      this.name,
      this.email,
      new ParticipantStatus(status),
    )
  }
}

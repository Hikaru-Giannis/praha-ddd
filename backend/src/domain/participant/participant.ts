import { createRandomIdString } from 'src/util/random'

export type Status = 'participating' | 'adjourning' | 'withdrawn'

export const STATUS = {
  PARTICIPATING: 'participating',
  ADJOURNING: 'adjourning',
  WITHDRAWN: 'withdrawn',
} as const

type CreateProps = {
  name: string
  email: string
}

type ReconstructProps = {
  id: string
  name: string
  email: string
  status: Status
}

export class Participant {
  private constructor(
    public readonly id: string,
    private readonly name: string,
    public readonly email: string,
    private readonly status: Status,
  ) {}

  static create({ name, email }: CreateProps) {
    return new Participant(
      createRandomIdString(),
      name,
      email,
      STATUS.PARTICIPATING,
    )
  }

  // インフラ層で実装
  static reconstruct({ id, name, email, status }: ReconstructProps) {
    return new Participant(id, name, email, status)
  }

  // インフラ層のみで利用
  public getAllProperties() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      status: this.status,
    }
  }

  public changeStatus(status: Status): Participant {
    return new Participant(this.id, this.name, this.email, status)
  }
}

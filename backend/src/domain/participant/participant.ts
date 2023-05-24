type Status = 'participating' | 'adjourning' | 'withdrawn'

export const STATUS = {
  PARTICIPATING: 'participating',
  ADJOURNING: 'adjourning',
  WITHDRAWN: 'withdrawn',
} as const

type ParticipantCreateProps = {
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

  static create({ id, name, email, status }: ParticipantCreateProps) {
    return new Participant(id, name, email, status)
  }
}

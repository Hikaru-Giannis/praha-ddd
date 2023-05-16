type ParticipantProps = {
  id: string
  name: string
  email: string
  status: 'participating' | 'adjourning' | 'withdrawn'
}

export class Participant {
  private constructor(
    private readonly id: string,
    private readonly name: string,
    public readonly email: string,
    private readonly status: 'participating' | 'adjourning' | 'withdrawn',
  ) {}

  static create({ id, name, email, status }: ParticipantProps) {
    return new Participant(id, name, email, status)
  }
}

import { Status } from 'src/domain/participant/participant'

type createProps = {
  id: string
  name: string
  email: string
  status: Status
}

export class ParticipantDTO {
  public readonly id: string
  public readonly name: string
  public readonly email: string
  public readonly status: Status
  public constructor(props: createProps) {
    const { id, name, email, status } = props
    this.id = id
    this.name = name
    this.email = email
    this.status = status
  }
}

export interface IParticipantQS {
  fetchAll(): Promise<ParticipantDTO[]>
}

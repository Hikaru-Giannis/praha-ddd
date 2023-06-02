import { ApiProperty } from '@nestjs/swagger'
import { ParticipantDTO } from 'src/app/participant/query-service-interface/participant.qs'

export class GetParticipantIndexResponse {
  @ApiProperty({ type: () => [Participant] })
  participants: Participant[]

  public constructor(params: { participantDTO: ParticipantDTO[] }) {
    const { participantDTO } = params
    this.participants = participantDTO.map(({ id, name, email, status }) => {
      return new Participant({
        id,
        name,
        email,
        status,
      })
    })
  }
}

class Participant {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  email: string

  @ApiProperty()
  status: 'participating' | 'adjourning' | 'withdrawn'

  public constructor(params: {
    id: string
    name: string
    email: string
    status: 'participating' | 'adjourning' | 'withdrawn'
  }) {
    this.id = params.id
    this.name = params.name
    this.email = params.email
    this.status = params.status
  }
}

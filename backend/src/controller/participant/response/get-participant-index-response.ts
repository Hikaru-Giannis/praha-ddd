import { ApiProperty } from '@nestjs/swagger'
import { ParticipantDTO } from 'src/app/participant/query-service-interface/participant.qs'

export class GetParticipantIndexResponse {
  @ApiProperty({ type: () => [Participant] })
  participants: Participant[]

  public constructor(params: { participantDTO: ParticipantDTO[] }) {
    const { participantDTO } = params
    this.participants = participantDTO.map(
      ({ id, name, email, status, team, pair }) => {
        return new Participant({
          id,
          name,
          email,
          status,
          team: team && {
            id: team.id,
            name: team.name,
          },
          pair: pair && {
            id: pair.id,
            name: pair.name,
          },
        })
      },
    )
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

  @ApiProperty()
  team?: {
    id: string
    name: string
  }

  @ApiProperty()
  pair?: {
    id: string
    name: string
  }

  public constructor(params: {
    id: string
    name: string
    email: string
    status: 'participating' | 'adjourning' | 'withdrawn'
    team?: {
      id: string
      name: string
    }
    pair?: {
      id: string
      name: string
    }
  }) {
    this.id = params.id
    this.name = params.name
    this.email = params.email
    this.status = params.status
    this.team = params.team
    this.pair = params.pair
  }
}

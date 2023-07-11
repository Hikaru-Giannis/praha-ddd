import { ApiProperty } from '@nestjs/swagger'
import { ParticipantSearchDTO } from 'src/app/participant/query-service-interface/participant-search.qs'

export class GetParticipantSearchResponse {
  @ApiProperty({ type: () => [Participant] })
  participants: Participant[]

  public constructor(params: { participantSearchDTO: ParticipantSearchDTO[] }) {
    const { participantSearchDTO } = params
    this.participants = participantSearchDTO.map(
      ({ id, name, email, taskProgresses }) => {
        return new Participant({
          id,
          name,
          email,
          taskProgresses: taskProgresses.map((taskProgress) => {
            return {
              task_id: taskProgress.task_id,
              status: taskProgress.status,
            }
          }),
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
  taskProgresses?: {
    task_id: string
    status: string
  }[]

  public constructor(params: {
    id: string
    name: string
    email: string
    taskProgresses: {
      task_id: string
      status: string
    }[]
  }) {
    this.id = params.id
    this.name = params.name
    this.email = params.email
    this.taskProgresses = params.taskProgresses
  }
}

import { ApiProperty } from '@nestjs/swagger'
import { TeamDTO } from 'src/app/team/query-service-interface/team.qs'

export class GetTeamIndexResponse {
  @ApiProperty({ type: () => [Team] })
  teams: Team[]

  public constructor(params: { teamDTO: TeamDTO[] }) {
    const { teamDTO } = params
    this.teams = teamDTO.map((team) => {
      return new Team({
        id: team.id,
        name: team.name,
        status: team.status,
        teamMembers:
          team.teamMembers.map((teamMember) => {
            return {
              id: teamMember.id,
              name: teamMember.name,
              email: teamMember.email,
            }
          }) ?? [],
      })
    })
  }
}

class Team {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  status: string

  @ApiProperty()
  teamMembers: {
    id: string
    name: string
  }[]

  public constructor(params: {
    id: string
    name: string
    status: string
    teamMembers: {
      id: string
      name: string
    }[]
  }) {
    this.id = params.id
    this.name = params.name
    this.status = params.status
    this.teamMembers = params.teamMembers ?? []
  }
}

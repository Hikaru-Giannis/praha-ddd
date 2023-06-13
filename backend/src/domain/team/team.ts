import { createRandomIdString } from 'src/util/random'
import { TeamMember } from './team-member'
import { TeamStatus } from './TeamStatus'
import { TeamName } from './TeamName'

type createTeamProps = {
  teamName: string
  teamMembers: TeamMember[]
}

export class Team {
  public readonly id: string
  private readonly teamName: TeamName
  private readonly status: TeamStatus
  private readonly teamMembers: TeamMember[]
  private constructor(
    id: string,
    teamName: TeamName,
    status: TeamStatus,
    teamMembers: TeamMember[],
  ) {
    this.id = id
    this.teamName = teamName
    this.status = status
    this.teamMembers = teamMembers
  }

  static create({ teamName, teamMembers }: createTeamProps) {
    return new Team(
      createRandomIdString(),
      TeamName.create(teamName),
      TeamStatus.active(),
      teamMembers,
    )
  }

  public get isInactive(): boolean {
    return this.status.isInactive
  }

  public assignTeamMember(teamMember: TeamMember): Team {
    return Team.create({
      teamName: this.teamName.value,
      teamMembers: [...this.teamMembers, teamMember],
    })
  }
}

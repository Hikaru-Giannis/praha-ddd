import { createRandomIdString } from 'src/util/random'
import { TeamMember } from './team-member'
import { TeamStatus, TeamStatusType } from './TeamStatus'
import { TeamName } from './TeamName'

type createTeamProps = {
  teamName: string
}

type reconstructTeamProps = {
  id: string
  teamName: string
  status: TeamStatusType
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
    teamMembers: TeamMember[] = [],
  ) {
    this.id = id
    this.teamName = teamName
    this.status = status
    this.teamMembers = teamMembers
  }

  static create({ teamName }: createTeamProps) {
    return new Team(
      createRandomIdString(),
      new TeamName(teamName),
      TeamStatus.active(),
    )
  }

  public get isInactive(): boolean {
    return this.status.isInactive
  }

  public assignTeamMember(teamMember: TeamMember): Team {
    return new Team(this.id, this.teamName, this.status, [
      ...this.teamMembers,
      teamMember,
    ])
  }

  static reconstruct({
    id,
    teamName,
    status,
    teamMembers,
  }: reconstructTeamProps) {
    return new Team(
      id,
      new TeamName(teamName),
      new TeamStatus(status),
      teamMembers.map((teamMember) => {
        return TeamMember.reconstruct(teamMember.getAllProperties)
      }),
    )
  }

  public getAllProperties() {
    return {
      id: this.id,
      teamName: this.teamName.value,
      status: this.status.value,
      teamMembers: this.teamMembers.map((teamMember) => {
        return teamMember.getAllProperties
      }),
    }
  }
}

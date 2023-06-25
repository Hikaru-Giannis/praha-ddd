import { createRandomIdString } from 'src/util/random'
import { TeamMember } from './team-member'
import { TeamStatus, TeamStatusType } from './TeamStatus'
import { TeamName } from './TeamName'
import { Pair } from '../pair/pair'

type CreateProps = {
  teamName: TeamName
  teamMembers: TeamMember[]
}

type ReconstructProps = {
  id: string
  teamName: TeamName
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

  static create({ teamName, teamMembers }: CreateProps) {
    if (teamMembers.length >= 3) {
      return new Team(
        createRandomIdString(),
        teamName,
        TeamStatus.active(),
        teamMembers,
      )
    }

    return new Team(
      createRandomIdString(),
      teamName,
      TeamStatus.inactive(),
      teamMembers,
    )
  }

  static reconstruct({ id, teamName, status, teamMembers }: ReconstructProps) {
    return new Team(
      id,
      teamName,
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

  public assignTeamMember(teamMember: TeamMember): Team {
    return new Team(this.id, this.teamName, this.status, [
      ...this.teamMembers,
      teamMember,
    ])
  }

  public assignTeamMembers(teamMembers: TeamMember[]): Team {
    return new Team(this.id, this.teamName, this.status, [
      ...this.teamMembers,
      ...teamMembers,
    ])
  }

  public delete() {
    return new Team(
      this.id,
      this.teamName,
      TeamStatus.disbanded(),
      this.teamMembers,
    )
  }

  public get isActive(): boolean {
    return this.status.isActive
  }

  public get isInactive(): boolean {
    return this.status.isInactive
  }

  public get teamMembersCount(): number {
    return this.teamMembers.length
  }

  public moveTeamMember(pair: Pair): [Team, TeamMember[]] {
    // 引数のペアのチームメンバーを取得
    const movedTeamMembers = this.teamMembers.filter((teamMember) => {
      return pair.hasPairMember(teamMember.participantId)
    })

    // 引数のペアのチームメンバーを削除
    const teamMembers = this.teamMembers.filter((teamMember) => {
      return !pair.hasPairMember(teamMember.participantId)
    })

    return [
      new Team(this.id, this.teamName, this.status, teamMembers),
      movedTeamMembers,
    ]
  }
}

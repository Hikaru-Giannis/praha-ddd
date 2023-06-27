import { createRandomIdString } from 'src/util/random'
import { TeamMember } from './team-member'
import { TeamStatus, TeamStatusType } from './TeamStatus'
import { TeamName } from './TeamName'
import { Pair } from '../pair/pair'
import { TeamId } from './TeamId'
import { ParticipantId } from '../participant/ParticipantId'

type CreateProps = {
  teamName: TeamName
  teamMembers: TeamMember[]
}

type ReconstructProps = {
  id: string
  teamName: string
  status: TeamStatusType
  teamMembers: TeamMember[]
}

export class Team {
  public readonly id: TeamId
  private readonly teamName: TeamName
  private readonly status: TeamStatus
  private readonly teamMembers: TeamMember[]

  private constructor(
    id: TeamId,
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
        new TeamId(createRandomIdString()),
        teamName,
        TeamStatus.active(),
        teamMembers,
      )
    }

    return new Team(
      new TeamId(createRandomIdString()),
      teamName,
      TeamStatus.inactive(),
      teamMembers,
    )
  }

  static reconstruct({ id, teamName, status, teamMembers }: ReconstructProps) {
    return new Team(
      new TeamId(id),
      new TeamName(teamName),
      new TeamStatus(status),
      teamMembers.map((teamMember) => {
        return TeamMember.reconstruct(teamMember.getAllProperties)
      }),
    )
  }

  public getAllProperties() {
    return {
      id: this.id.value,
      teamName: this.teamName.value,
      status: this.status.value,
      teamMembers: this.teamMembers.map((teamMember) => {
        return teamMember.getAllProperties
      }),
    }
  }

  public assignTeamMembers(teamMembers: TeamMember[]): Team {
    const newTeamMembers = [...this.teamMembers, ...teamMembers]
    const newStatus = this.getStatusByTeamMembersCount(newTeamMembers.length)
    return new Team(this.id, this.teamName, newStatus, newTeamMembers)
  }

  private getStatusByTeamMembersCount(teamMembersCount: number): TeamStatus {
    if (teamMembersCount >= 3) {
      return TeamStatus.active()
    }

    return TeamStatus.inactive()
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

    const newStatus = this.getStatusByTeamMembersCount(teamMembers.length)

    return [
      new Team(this.id, this.teamName, newStatus, teamMembers),
      movedTeamMembers,
    ]
  }

  public hasTeamMember(participantId: ParticipantId): boolean {
    return this.teamMembers.some((teamMember) => {
      return teamMember.participantId.equals(participantId)
    })
  }

  public removeTeamMember(participantId: ParticipantId): Team {
    const teamMembers = this.teamMembers.filter((teamMember) => {
      return !teamMember.participantId.equals(participantId)
    })

    const newStatus = this.getStatusByTeamMembersCount(teamMembers.length)

    return new Team(this.id, this.teamName, newStatus, teamMembers)
  }
}

import { createRandomIdString } from 'src/util/random'
import { TeamMember } from './team-member'
import { TeamStatus } from './TeamStatus'
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
  teamMembers: TeamMember[]
}

export class Team {
  public readonly id: TeamId
  private readonly teamName: TeamName
  private readonly teamMembers: TeamMember[]

  private constructor(
    id: TeamId,
    teamName: TeamName,
    teamMembers: TeamMember[] = [],
  ) {
    this.id = id
    this.teamName = teamName
    this.teamMembers = teamMembers
  }

  static create({ teamName, teamMembers }: CreateProps) {
    return new Team(new TeamId(createRandomIdString()), teamName, teamMembers)
  }

  static reconstruct({ id, teamName, teamMembers }: ReconstructProps) {
    return new Team(
      new TeamId(id),
      new TeamName(teamName),
      teamMembers.map((teamMember) => {
        return TeamMember.reconstruct(teamMember.getAllProperties)
      }),
    )
  }

  public get status(): TeamStatus {
    return this.teamMembers.length >= 3
      ? TeamStatus.active()
      : TeamStatus.inactive()
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
    return new Team(this.id, this.teamName, newTeamMembers)
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

    return [new Team(this.id, this.teamName, teamMembers), movedTeamMembers]
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

    return new Team(this.id, this.teamName, teamMembers)
  }
}

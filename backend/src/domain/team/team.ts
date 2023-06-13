import { createRandomIdString } from 'src/util/random'
import { TeamMember } from './team-member'
import { TeamStatus } from './TeamStatus'

type createTeamProps = {
  teamName: string
  teamMembers: TeamMember[]
}

export class Team {
  public readonly id: string
  private readonly teamName: string
  private readonly status: TeamStatus
  private readonly teamMembers: TeamMember[]
  private constructor(
    id: string,
    teamName: string,
    status: TeamStatus,
    teamMembers: TeamMember[],
  ) {
    this.id = id
    // 名前は数字のみ
    if (!teamName.match(/^[0-9]+$/)) {
      throw new Error('名前は数字のみです')
    }
    // 名前は3文字以下
    if (teamName.length > 3) {
      throw new Error('名前は3文字以下です')
    }
    this.teamName = teamName
    this.status = status
    this.teamMembers = teamMembers
  }

  static create({ teamName, teamMembers }: createTeamProps) {
    return new Team(
      createRandomIdString(),
      teamName,
      TeamStatus.active(),
      teamMembers,
    )
  }

  public isInactive(): boolean {
    return this.status.isInactive()
  }

  public assignTeamMember(teamMember: TeamMember): Team {
    return Team.create({
      teamName: this.teamName,
      teamMembers: [...this.teamMembers, teamMember],
    })
  }
}

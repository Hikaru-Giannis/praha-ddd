import { TeamMember } from './team-member'

type Status = 'active' | 'inactive' | 'disbanded'

export const Status = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DISBANDED: 'disbanded',
} as const

type createTeamProps = {
  id: string
  teamName: string
  status: Status
  teamMembers: TeamMember[]
}

export class Team {
  public readonly id: string
  private readonly teamName: string
  private readonly status: Status
  private readonly teamMembers: TeamMember[]
  private constructor(
    id: string,
    teamName: string,
    status: Status,
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

  static create({ id, teamName, status, teamMembers }: createTeamProps) {
    return new Team(id, teamName, status, teamMembers)
  }

  public isInactive(): boolean {
    return this.status === 'inactive'
  }

  public assignTeamMember(teamMember: TeamMember): Team {
    return Team.create({
      id: this.id,
      teamName: this.teamName,
      status: this.status,
      teamMembers: [...this.teamMembers, teamMember],
    })
  }
}

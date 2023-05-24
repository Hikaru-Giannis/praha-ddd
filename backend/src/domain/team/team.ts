import { TeamMember } from './team-member'

type createTeamProps = {
  id: string
  teamName: string
  status: 'active' | 'inactive' | 'disbanded'
  teamMembers: TeamMember[]
}

export class Team {
  private readonly id: string
  private readonly teamName: string
  private readonly status: 'active' | 'inactive' | 'disbanded'
  private readonly teamMembers: TeamMember[]
  private constructor(
    id: string,
    teamName: string,
    status: 'active' | 'inactive' | 'disbanded',
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
}

import { Inject } from '@nestjs/common'
import { Participant } from '../participant/participant'
import { Team } from './team'
import { TeamMember } from './team-member'
import { ITeamRepository } from './team.repository'
import { tokens } from 'src/tokens'

export class AssignTeamService {
  public constructor(
    @Inject(tokens.ITeamRepository)
    private readonly teamRepository: ITeamRepository,
  ) {}

  public async assign(participant: Participant): Promise<Team> {
    const allTeams = await this.teamRepository.fetchAll()

    const inactiveTeams = allTeams.filter((team) => team.isInactive)
    if (inactiveTeams.length > 0) {
      const team = this.assignToTeamWithMinMembers(inactiveTeams, participant)
      return team
    }

    const activeTeams = allTeams.filter((team) => team.isActive)
    return this.assignToTeamWithMinMembers(activeTeams, participant)
  }

  private assignToTeamWithMinMembers(
    teams: Team[],
    participant: Participant,
  ): Team {
    const minMembersCount = Math.min(
      ...teams.map((team) => team.teamMembersCount),
    )
    const minMembersTeams = teams.filter(
      (team) => team.teamMembersCount === minMembersCount,
    )

    const chosenTeam =
      minMembersTeams[Math.floor(Math.random() * minMembersTeams.length)]

    if (chosenTeam) {
      const teamMember = TeamMember.create({
        participantId: participant.id,
      })
      const team = chosenTeam.assignTeamMembers([teamMember])
      return team
    }

    // TODO 管理者にメール送信
    throw new Error('割り当てるチームが見つかりませんでした')
  }
}

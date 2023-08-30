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

  public async assign(participant: Participant): Promise<void> {
    const allTeams = await this.teamRepository.fetchAll()

    // 1. メンバーが不足しているチームから割り当てる
    const inactiveTeams = allTeams.filter((team) => team.isInactive)
    if (inactiveTeams.length > 0) {
      await this.assignToTeamWithMinMembers(inactiveTeams, participant)
      return
    }

    // 2. メンバーが足りているチームから割り当てる
    const activeTeams = allTeams.filter((team) => team.isActive)
    await this.assignToTeamWithMinMembers(activeTeams, participant)
  }

  private async assignToTeamWithMinMembers(
    teams: Team[],
    participant: Participant,
  ): Promise<void> {
    // チーム内の最小参加数を取得
    const minMembersCount = Math.min(
      ...teams.map((team) => team.teamMembersCount),
    )
    // 最小参加数のチームを取得
    const minMembersTeams = teams.filter(
      (team) => team.teamMembersCount === minMembersCount,
    )

    // 最小参加数のチームからランダムに1つ選択
    const chosenTeam =
      minMembersTeams[Math.floor(Math.random() * minMembersTeams.length)]

    if (chosenTeam) {
      const teamMember = TeamMember.create({
        participantId: participant.id,
      })
      const team = chosenTeam.assignTeamMembers([teamMember])
      await this.teamRepository.save(team)
      return
    }

    // TODO 管理者にメール送信
    throw new Error('割り当てるチームが見つかりませんでした')
  }
}

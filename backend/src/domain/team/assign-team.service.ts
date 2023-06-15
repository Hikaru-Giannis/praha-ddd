import { Participant } from '../participant/participant'
import { TeamMember } from './team-member'
import { ITeamRepository } from './team.repository'

export class AssignTeamService {
  public constructor(private readonly teamRepository: ITeamRepository) {}

  public async assign(participant: Participant): Promise<void> {
    const allTeams = await this.teamRepository.fetchAll()
    const inactiveTeams = allTeams.filter((team) => team.isInactive)

    if (inactiveTeams.length > 0 && inactiveTeams[0]) {
      // 不活性チームがある場合は、そのチームに参加者を追加する
      const teamMember = TeamMember.create({
        teamId: inactiveTeams[0].id,
        participantId: participant.id,
      })
      const team = inactiveTeams[0].assignTeamMember(teamMember)
      await this.teamRepository.save(team)
      return
    }

    // 不活性チームがない場合は、活性化チームに参加者を追加する
    const activeTeams = allTeams.filter((team) => !team.isInactive)
    if (activeTeams[0]) {
      const teamMember = TeamMember.create({
        teamId: activeTeams[0].id,
        participantId: participant.id,
      })
      const team = activeTeams[0].assignTeamMember(teamMember)
      await this.teamRepository.save(team)
    }
  }
}

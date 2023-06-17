import { Participant } from '../participant/participant'
import { Team } from './team'
import { TeamMember } from './team-member'
import { ITeamRepository } from './team.repository'

export class AssignTeamService {
  public constructor(private readonly teamRepository: ITeamRepository) {}

  public async assign(participant: Participant): Promise<Team | undefined> {
    const allTeams = await this.teamRepository.fetchAll()

    const inactiveTeams = allTeams.filter((team) => team.isInactive)
    if (inactiveTeams.length > 0) {
      // 非活性チームがある場合は、参加者を参加者数が少ないチームに追加する
      inactiveTeams.sort((a, b) => a.teamMembersCount - b.teamMembersCount)
      const inactiveTeam = inactiveTeams[0]
      if (inactiveTeam) {
        const teamMember = TeamMember.create({
          teamId: inactiveTeam.id,
          participantId: participant.id,
        })
        const team = inactiveTeam.assignTeamMember(teamMember)
        await this.teamRepository.save(team)
        return team
      }
    }

    // 非活性チームがない場合は、参加者を活性チームに追加する
    const activeTeams = allTeams.filter((team) => !team.isInactive)
    activeTeams.sort((a, b) => a.teamMembersCount - b.teamMembersCount)
    const activeTeam = activeTeams[0]
    if (activeTeam) {
      const teamMember = TeamMember.create({
        teamId: activeTeam.id,
        participantId: participant.id,
      })
      const team = activeTeam.assignTeamMember(teamMember)
      await this.teamRepository.save(team)
      return team
    }
  }
}

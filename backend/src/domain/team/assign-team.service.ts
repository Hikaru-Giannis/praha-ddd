import { createRandomIdString } from 'src/util/random'
import { Participant } from '../participant/participant'
import { TeamMember } from './team-member'
import { ITeamRepository } from './team.repository'
import { Status, Team } from './team'

export class AssignTeamService {
  public constructor(private readonly teamRepository: ITeamRepository) {}

  public async assign(participant: Participant): Promise<void> {
    const teams = await this.teamRepository.fetchAll()

    const inactiveTeams = teams.filter((team) => team.isInactive())
    if (inactiveTeams.length > 0) {
      const inactiveTeam = inactiveTeams[0]

      if (inactiveTeam) {
        const newTeamMember = TeamMember.create({
          id: createRandomIdString(),
          teamId: inactiveTeam.id,
          participantId: participant.id,
        })

        inactiveTeam.assignTeamMember(newTeamMember)
        await this.teamRepository.save(inactiveTeam)
        return
      }
    }

    const newTeamId = createRandomIdString()
    const newTeam = Team.create({
      id: newTeamId,
      teamName: 'a',
      status: Status.INACTIVE,
      teamMembers: [
        TeamMember.create({
          id: createRandomIdString(),
          teamId: newTeamId,
          participantId: participant.id,
        }),
      ],
    })
    await this.teamRepository.save(newTeam)
  }
}

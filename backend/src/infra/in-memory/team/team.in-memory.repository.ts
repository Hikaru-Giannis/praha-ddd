import { ITeamRepository } from 'src/domain/team/team.repository'
import { Team } from 'src/domain/team/team'
import { ParticipantId } from 'src/domain/participant/ParticipantId'
import { TeamId } from 'src/domain/team/TeamId'

export class TeamInMemoryRepository implements ITeamRepository {
  public items: Team[] = []

  public async findById(id: TeamId): Promise<Team | null> {
    const team = this.items.find((item) => {
      return item.id.equals(id)
    })

    return team ? team : null
  }

  public async findByParticipantId(
    participantId: ParticipantId,
  ): Promise<Team | null> {
    const team = this.items.find((item) => {
      return item.hasTeamMember(participantId)
    })
    return team ? team : null
  }

  public async findAll(): Promise<Team[]> {
    return this.items
  }

  public async save(team: Team): Promise<void> {
    const foundIndex = this.items.findIndex((item) => {
      return item.id.equals(team.id)
    })

    if (foundIndex === -1) {
      this.items.push(team)
    } else {
      this.items[foundIndex] = team
    }
  }
}

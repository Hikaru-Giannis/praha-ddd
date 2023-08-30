import { ITeamRepository } from 'src/domain/team/team.repository'
import { Team } from 'src/domain/team/team'
import { Pair } from 'src/domain/pair/pair'
import { Participant } from 'src/domain/participant/participant'

export class TeamInMemoryRepository implements ITeamRepository {
  public items: Team[] = []

  public async findById(id: string): Promise<Team | null> {
    const team = this.items.find((item) => {
      const allProperties = item.getAllProperties()
      return allProperties.id === id
    })

    return team ? team : null
  }

  public async findByPartcipant(
    participant: Participant,
  ): Promise<Team | null> {
    const team = this.items.find((item) => {
      return item.hasTeamMember(participant.id)
    })
    return team ? team : null
  }

  public async findByPair(pair: Pair): Promise<Team | null> {
    const allProperties = pair.getAllProperties()
    const team = this.items.find((item) => {
      return item.id.equals(allProperties.teamId)
    })
    return team ? team : null
  }

  public async fetchAll(): Promise<Team[]> {
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

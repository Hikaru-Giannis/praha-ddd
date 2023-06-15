import { Team } from 'src/domain/team/team'
import { ITeamRepository } from 'src/domain/team/team.repository'

export class TeamRepository implements ITeamRepository {
  public async fetchAll() {
    return []
  }

  public async save(team: Team): Promise<void> {
    console.log(team)
  }
}

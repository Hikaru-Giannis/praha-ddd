import { Team } from './team'

export interface ITeamRepository {
  fetchAll(): Promise<Team[]>
  save(team: Team): Promise<void>
}

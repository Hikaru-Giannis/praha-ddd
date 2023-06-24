import { Pair } from '../pair/pair'
import { Team } from './team'

export interface ITeamRepository {
  findById(id: string): Promise<Team | null>
  findByPair(pair: Pair): Promise<Team | null>
  fetchAll(): Promise<Team[]>
  save(team: Team): Promise<void>
}

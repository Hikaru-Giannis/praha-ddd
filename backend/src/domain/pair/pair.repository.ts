import { TeamId } from '../team/TeamId'
import { Pair } from './pair'
export interface IPairRepository {
  findById(id: string): Promise<Pair | null>
  fetchByTeamId(teamId: TeamId): Promise<Pair[]>
  fetchAll(): Promise<Pair[]>
  save(pair: Pair): Promise<void>
  delete(pair: Pair): Promise<void>
}

import { Pair } from './pair'
export interface IPairRepository {
  findById(id: string): Promise<Pair | null>
  fetchByTeamId(teamId: string): Promise<Pair[]>
  save(pair: Pair): Promise<void>
}

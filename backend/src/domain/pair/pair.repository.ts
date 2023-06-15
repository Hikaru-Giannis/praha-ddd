import { Pair } from './pair'
export interface IPairRepository {
  fetchByTeamId(teamId: string): Promise<Pair[]>
}

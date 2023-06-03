import { IPairRepository } from 'src/domain/pair/pair.repository'

export class PairRepository implements IPairRepository {
  public async fetchByTeamId(teamId: string) {
    return []
  }
}

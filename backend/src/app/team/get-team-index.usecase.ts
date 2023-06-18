import { ITeamQS } from './query-service-interface/team.qs'

export class GetTeamIndexUseCase {
  private readonly teamQS
  constructor(teamQS: ITeamQS) {
    this.teamQS = teamQS
  }
  async do() {
    return await this.teamQS.fetchAll()
  }
}

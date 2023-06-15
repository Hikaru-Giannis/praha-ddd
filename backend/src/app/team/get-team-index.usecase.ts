import { ITeamQS } from './query-service-interface/team.qs'

export class GetTeamIndexUseCase {
  private readonly teamQS
  constructor(teamQS: ITeamQS) {
    this.teamQS = teamQS
  }
  async do() {
    try {
      return await this.teamQS.fetchAll()
    } catch (error) {
      // memo: エラー処理
      throw error
    }
  }
}

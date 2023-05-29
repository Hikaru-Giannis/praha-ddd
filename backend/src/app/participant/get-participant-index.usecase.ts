import { IParticipantQS } from './query-service-interface/participant.qs'

export class GetParticipantIndexUseCase {
  private readonly participantDataQS
  constructor(participantDataQS: IParticipantQS) {
    this.participantDataQS = participantDataQS
  }
  async do() {
    try {
      return await this.participantDataQS.fetchAll()
    } catch (error) {
      // memo: エラー処理
      throw error
    }
  }
}

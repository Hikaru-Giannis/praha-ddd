import { IParticipantQS } from './query-service-interface/participant.qs'

export class GetParticipantIndexUseCase {
  constructor(private participantDataQS: IParticipantQS) {}
  async do() {
    try {
      return await this.participantDataQS.fetchAll()
    } catch (error) {
      throw error
    }
  }
}

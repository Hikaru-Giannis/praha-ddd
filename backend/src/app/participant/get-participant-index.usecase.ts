import { Inject, Injectable } from '@nestjs/common'
import { IParticipantQS } from './query-service-interface/participant.qs'
import { tokens } from 'src/tokens'

@Injectable()
export class GetParticipantIndexUseCase {
  constructor(
    @Inject(tokens.IParticipantQS)
    private participantDataQS: IParticipantQS,
  ) {}
  async do() {
    return await this.participantDataQS.fetchAll()
  }
}

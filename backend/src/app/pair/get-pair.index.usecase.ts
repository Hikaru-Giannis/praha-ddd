import { Inject, Injectable } from '@nestjs/common'
import { IPairQS } from './query-service-interface/pair.qs'
import { tokens } from 'src/tokens'

@Injectable()
export class GetPairIndexUseCase {
  constructor(
    @Inject(tokens.IPairQS)
    private readonly pairQS: IPairQS,
  ) {}
  async do() {
    return await this.pairQS.fetchAll()
  }
}

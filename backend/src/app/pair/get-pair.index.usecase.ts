import { IPairQS } from './query-service-interface/pair.qs'

export class GetPairIndexUseCase {
  constructor(private readonly pairQS: IPairQS) {}
  async do() {
    return await this.pairQS.fetchAll()
  }
}

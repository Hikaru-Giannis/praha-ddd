import { Inject, Injectable } from '@nestjs/common'
import { ITeamQS } from './query-service-interface/team.qs'
import { tokens } from 'src/tokens'

@Injectable()
export class GetTeamIndexUseCase {
  constructor(
    @Inject(tokens.ITeamQS)
    private readonly teamQS: ITeamQS,
  ) {}
  async do() {
    return await this.teamQS.fetchAll()
  }
}

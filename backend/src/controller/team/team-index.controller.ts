import { Controller, Get, Inject } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { GetTeamIndexResponse } from './response/get-team-index-response'
import { GetTeamIndexUseCase } from 'src/app/team/get-team-index.usecase'
import { tokens } from 'src/tokens'

@Controller('team')
export class TeamIndexController {
  constructor(
    @Inject(tokens.GetTeamIndexUseCase)
    private readonly getTeamIndexUseCase: GetTeamIndexUseCase,
  ) {}
  @Get('index')
  @ApiResponse({ status: 200, type: GetTeamIndexResponse })
  async getSomeData(): Promise<GetTeamIndexResponse> {
    const result = await this.getTeamIndexUseCase.do()
    return new GetTeamIndexResponse({ teamDTO: result })
  }
}

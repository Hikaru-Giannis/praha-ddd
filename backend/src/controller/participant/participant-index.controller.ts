import { Controller, Get, Inject } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { GetParticipantIndexResponse } from './response/get-participant-index-response'
import { GetParticipantIndexUseCase } from 'src/app/participant/get-participant-index.usecase'
import { tokens } from 'src/tokens'

@Controller('participant')
export class ParticipantIndexController {
  constructor(
    @Inject(tokens.GetParticipantIndexUseCase)
    private readonly getParticipantIndexUseCase: GetParticipantIndexUseCase,
  ) {}
  @Get('index')
  @ApiResponse({ status: 200, type: GetParticipantIndexResponse })
  async getSomeData(): Promise<GetParticipantIndexResponse> {
    const result = await this.getParticipantIndexUseCase.do()
    return new GetParticipantIndexResponse({ participantDTO: result })
  }
}

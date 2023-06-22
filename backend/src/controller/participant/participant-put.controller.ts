import { Controller, Put, Body, Inject } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { PutParticipantUseCase } from 'src/app/participant/put-participant.usecase'
import { PutParticipantRequest } from './request/put-participant-request'
import { tokens } from 'src/tokens'

@Controller('participant')
export class ParticipantPutController {
  constructor(
    @Inject(tokens.PutParticipantUseCase)
    private readonly putParticipantUseCase: PutParticipantUseCase,
  ) {}
  // Put処理
  @Put()
  @ApiResponse({ status: 200 })
  async putParticipant(
    @Body() putParticipantDto: PutParticipantRequest,
  ): Promise<{
    status: number
  }> {
    await this.putParticipantUseCase.do(
      putParticipantDto.id,
      putParticipantDto.status,
    )
    return { status: 200 }
  }
}

import { Controller, Body, Inject, Param, Patch } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { PutParticipantUseCase } from 'src/app/participant/put-participant.usecase'
import { PatchParticipantRequest } from './request/patch-participant-request'
import { tokens } from 'src/tokens'
import { DomainValidationError } from 'src/domain/error/domain-validation.error'

@Controller('participant/:participantId')
export class ParticipantPatchController {
  constructor(
    @Inject(tokens.PutParticipantUseCase)
    private readonly putParticipantUseCase: PutParticipantUseCase,
  ) {}
  // Patch処理
  @Patch()
  @ApiResponse({ status: 200 })
  async putParticipant(
    @Param('participantId') participantId: string,
    @Body() putParticipantDto: PatchParticipantRequest,
  ): Promise<{
    status: number
    message?: string
  }> {
    try {
      await this.putParticipantUseCase.do(
        participantId,
        putParticipantDto.status,
      )
      return { status: 200 }
    } catch (error) {
      if (error instanceof DomainValidationError) {
        return { status: 422, message: error.message }
      }

      return { status: 500 }
    }
  }
}

import { Controller, Body, Inject, Param, Patch } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { PatchParticipantUseCase } from 'src/app/participant/patch-participant.usecase'
import { PatchParticipantRequest } from './request/patch-participant-request'
import { tokens } from 'src/tokens'
import { DomainValidationError } from 'src/domain/error/domain-validation.error'

@Controller('participant/:participantId')
export class ParticipantPatchController {
  constructor(
    @Inject(tokens.PatchParticipantUseCase)
    private readonly PatchParticipantUseCase: PatchParticipantUseCase,
  ) {}
  // Patch処理
  @Patch()
  @ApiResponse({ status: 200 })
  async patchParticipant(
    @Param('participantId') participantId: string,
    @Body() patchParticipantDto: PatchParticipantRequest,
  ): Promise<{
    status: number
    message?: string
  }> {
    try {
      await this.PatchParticipantUseCase.do(
        participantId,
        patchParticipantDto.status,
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

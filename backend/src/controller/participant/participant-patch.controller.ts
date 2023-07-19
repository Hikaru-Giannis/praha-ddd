import { Controller, Body, Inject, Param, Patch } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { PatchParticipantRequest } from './request/patch-participant-request'
import { tokens } from 'src/tokens'
import { DomainValidationError } from 'src/domain/error/domain-validation.error'
import { PatchParticipantingUseCase } from 'src/app/participant/patch-participanting.usecase'
import { PatchAdjourningUseCase } from 'src/app/participant/patch-adjourning.usecase'
import { PatchWithdrawnUseCase } from 'src/app/participant/patch-withdrawn.usecase'

@Controller('participant/:participantId')
export class ParticipantPatchController {
  constructor(
    @Inject(tokens.PatchParticipantingUseCase)
    private readonly PatchParticipantingUseCase: PatchParticipantingUseCase,
    @Inject(tokens.PatchAdjourningUseCase)
    private readonly PatchAdjourningUseCase: PatchAdjourningUseCase,
    @Inject(tokens.PatchWithdrawnUseCase)
    private readonly PatchWithdrawnUseCase: PatchWithdrawnUseCase,
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
      switch (patchParticipantDto.status) {
        case 'participating':
          await this.PatchParticipantingUseCase.do(
            participantId,
            patchParticipantDto.status,
          )
          break
        case 'adjourning':
          await this.PatchAdjourningUseCase.do(
            participantId,
            patchParticipantDto.status,
          )
          break
        case 'withdrawn':
          await this.PatchWithdrawnUseCase.do(
            participantId,
            patchParticipantDto.status,
          )
          break
        default:
          throw new DomainValidationError('status is invalid')
      }

      return { status: 200 }
    } catch (error) {
      console.error(error)
      if (error instanceof DomainValidationError) {
        return { status: 422, message: error.message }
      }

      return { status: 500 }
    }
  }
}

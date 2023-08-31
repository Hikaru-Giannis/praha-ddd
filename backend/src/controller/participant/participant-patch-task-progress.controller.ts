import { Controller, Body, Inject, Param, Patch } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { tokens } from 'src/tokens'
import { DomainValidationException } from 'src/domain/error/domain-validation.exception'
import { ChangeTaskProgressUseCase } from 'src/app/pair/change-task-progress.usecase'
import { PatchParticipantTaskProgressRequest } from './request/patch-participant-task-progress-request'

@Controller('participant/:participantId/task-progress')
export class ParticipantPatchTaskProgressController {
  constructor(
    @Inject(tokens.ChangeTaskProgressUseCase)
    private readonly changeTaskProgressUseCase: ChangeTaskProgressUseCase,
  ) {}
  // Patch処理
  @Patch()
  @ApiResponse({ status: 200 })
  async putParticipant(
    @Param('participantId') participantId: string,
    @Body()
    patchParticipantTaskProgressDto: PatchParticipantTaskProgressRequest,
  ): Promise<{
    status: number
    message?: string
  }> {
    try {
      await this.changeTaskProgressUseCase.do(
        participantId,
        patchParticipantTaskProgressDto.taskId,
        patchParticipantTaskProgressDto.status,
      )
      return { status: 200 }
    } catch (error) {
      if (error instanceof DomainValidationException) {
        return { status: 422, message: error.message }
      }
      console.error(error)
      return { status: 500 }
    }
  }
}

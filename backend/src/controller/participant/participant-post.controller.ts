import { Controller, Body, Post, Inject } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { StoreParticipantUseCase } from 'src/app/participant/store-participant.usecase'
import { PostParticipantRequest } from './request/post-participant-request'
import { tokens } from 'src/tokens'
import { DomainValidationException } from 'src/domain/error/domain-validation.exception'

@Controller('participant')
export class ParticipantPostController {
  constructor(
    @Inject(tokens.StoreParticipantUseCase)
    private readonly storeParticipantUseCase: StoreParticipantUseCase,
  ) {}
  @Post()
  @ApiResponse({ status: 200 })
  async postParticipant(
    @Body() postParticipantDto: PostParticipantRequest,
  ): Promise<{
    status: number
    message?: string
  }> {
    try {
      await this.storeParticipantUseCase.do({
        name: postParticipantDto.name,
        email: postParticipantDto.email,
      })
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

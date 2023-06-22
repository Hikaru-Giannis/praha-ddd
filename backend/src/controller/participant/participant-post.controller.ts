import { Controller, Body, Post, Inject } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { StoreParticipantUseCase } from 'src/app/participant/store-participant.usecase'
import { PostParticipantRequest } from './request/post-participant-request'
import { tokens } from 'src/tokens'

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
  }> {
    await this.storeParticipantUseCase.do({
      name: postParticipantDto.name,
      email: postParticipantDto.email,
    })
    return { status: 200 }
  }
}

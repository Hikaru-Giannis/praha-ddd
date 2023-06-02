import { Controller, Get, Put, Body } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { GetParticipantIndexResponse } from './response/get-participant-index-response'
import { PrismaClient } from '@prisma/client'
import { GetParticipantIndexUseCase } from 'src/app/participant/get-participant-index.usecase'
import { ParticipantQS } from 'src/infra/db/query-service/participant/participant.qs'
import { ParticipantRepository } from 'src/infra/db/repository/participant/participant.repository'
import { PutParticipantUseCase } from 'src/app/participant/put-participant.usecase'
import { PutParticipantRequest } from './request/put-participant-request'

@Controller('participant')
export class ParticipantController {
  // memo: @ApiResponseを定義しておかないとSwaggerに出力されない
  @Get('index')
  @ApiResponse({ status: 200, type: GetParticipantIndexResponse })
  async getSomeData(): Promise<GetParticipantIndexResponse> {
    const prisma = new PrismaClient()
    const qs = new ParticipantQS(prisma)
    const usecase = new GetParticipantIndexUseCase(qs)
    const result = await usecase.do()
    const response = new GetParticipantIndexResponse({ participantDTO: result })
    return response
  }

  // Put処理
  @Put()
  @ApiResponse({ status: 200 })
  async putParticipant(
    @Body() putParticipantDto: PutParticipantRequest,
  ): Promise<{
    status: number
  }> {
    const prisma = new PrismaClient()
    const repo = new ParticipantRepository(prisma)
    const usecase = new PutParticipantUseCase(repo)
    await usecase.do(putParticipantDto.id, putParticipantDto.status)
    return { status: 200 }
  }
}

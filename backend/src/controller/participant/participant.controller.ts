import { Controller, Get, Put, Body, Post } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { GetParticipantIndexResponse } from './response/get-participant-index-response'
import { PrismaClient } from '@prisma/client'
import { GetParticipantIndexUseCase } from 'src/app/participant/get-participant-index.usecase'
import { ParticipantQS } from 'src/infra/db/query-service/participant/participant.qs'
import { ParticipantRepository } from 'src/infra/db/repository/participant/participant.repository'
import { TeamRepository } from 'src/infra/db/repository/team/team.repository'
import { PutParticipantUseCase } from 'src/app/participant/put-participant.usecase'
import { PutParticipantRequest } from './request/put-participant-request'
import { StoreParticipantUseCase } from 'src/app/participant/store-participant.usecase'
import { PairRepository } from 'src/infra/db/repository/pair/pair.repository'
import { PostParticipantRequest } from './request/post-participant-request'

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

  @Post()
  @ApiResponse({ status: 200 })
  async postParticipant(
    @Body() postParticipantDto: PostParticipantRequest,
  ): Promise<{
    status: number
  }> {
    const prisma = new PrismaClient()
    const participantrepo = new ParticipantRepository(prisma)
    const teamRepo = new TeamRepository()
    const pairRepo = new PairRepository()
    const usecase = new StoreParticipantUseCase(
      participantrepo,
      teamRepo,
      pairRepo,
    )
    await usecase.do({
      name: postParticipantDto.name,
      email: postParticipantDto.email,
    })
    return { status: 200 }
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

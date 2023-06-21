import { Controller, Get, Put, Body, Post } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { PrismaClient } from '@prisma/client'
import { ParticipantRepository } from 'src/infra/db/repository/participant/participant.repository'
import { TeamRepository } from 'src/infra/db/repository/team/team.repository'
import { PutParticipantUseCase } from 'src/app/participant/put-participant.usecase'
import { PutParticipantRequest } from './request/put-participant-request'
import { StoreParticipantUseCase } from 'src/app/participant/store-participant.usecase'
import { PairRepository } from 'src/infra/db/repository/pair/pair.repository'
import { PostParticipantRequest } from './request/post-participant-request'
import { ValidateEmailUniquenessService } from 'src/domain/participant/validate-email-uniqueness.service'

@Controller('participant')
export class ParticipantController {
  @Post()
  @ApiResponse({ status: 200 })
  async postParticipant(
    @Body() postParticipantDto: PostParticipantRequest,
  ): Promise<{
    status: number
  }> {
    const prisma = new PrismaClient()
    const participantrepo = new ParticipantRepository(prisma)
    const teamRepo = new TeamRepository(prisma)
    const pairRepo = new PairRepository(prisma)
    const validateEmailUniquenessService = new ValidateEmailUniquenessService(
      participantrepo,
    )
    const usecase = new StoreParticipantUseCase(
      participantrepo,
      teamRepo,
      pairRepo,
      validateEmailUniquenessService,
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

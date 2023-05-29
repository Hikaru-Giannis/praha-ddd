import { Controller, Get } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { GetParticipantIndexResponse } from './response/get-participant-index-response'
import { PrismaClient } from '@prisma/client'
import { GetParticipantIndexUseCase } from 'src/app/participant/get-participant-index.usecase'
import { ParticipantQS } from 'src/infra/db/query-service/participant/participant.qs'

@Controller({
  path: '/participant/index',
})
export class ParticipantController {
  // memo: @ApiResponseを定義しておかないとSwaggerに出力されない
  @Get()
  @ApiResponse({ status: 200, type: GetParticipantIndexResponse })
  async getSomeData(): Promise<GetParticipantIndexResponse> {
    const prisma = new PrismaClient()
    const qs = new ParticipantQS(prisma)
    const usecase = new GetParticipantIndexUseCase(qs)
    const result = await usecase.do()
    const response = new GetParticipantIndexResponse({ someDatas: result })
    return response
  }
}

import { Controller, Get } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { GetTeamIndexResponse } from './response/get-team-index-response'
import { PrismaClient } from '@prisma/client'
import { TeamQS } from 'src/infra/db/query-service/team/team.qs'
import { GetTeamIndexUseCase } from 'src/app/team/get-team-index.usecase'

@Controller('team')
export class TeamController {
  // memo: @ApiResponseを定義しておかないとSwaggerに出力されない
  @Get('index')
  @ApiResponse({ status: 200, type: GetTeamIndexResponse })
  async getSomeData(): Promise<GetTeamIndexResponse> {
    const prisma = new PrismaClient()
    const qs = new TeamQS(prisma)
    const usecase = new GetTeamIndexUseCase(qs)
    const result = await usecase.do()
    const response = new GetTeamIndexResponse({ teamDTO: result })
    return response
  }
}

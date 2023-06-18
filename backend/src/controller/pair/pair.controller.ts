import { Controller, Get } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { PrismaClient } from '@prisma/client'
import { GetPairIndexUseCase } from 'src/app/pair/get-pair.index.usecase'
import { PairQS } from 'src/infra/db/query-service/pair/pair.qs'
import { GetPairIndexResponse } from './response/get-pair-index-response'

@Controller('pair')
export class PairController {
  // memo: @ApiResponseを定義しておかないとSwaggerに出力されない
  @Get('index')
  @ApiResponse({ status: 200, type: GetPairIndexResponse })
  async getPairData(): Promise<GetPairIndexResponse> {
    const prisma = new PrismaClient()
    const qs = new PairQS(prisma)
    const usecase = new GetPairIndexUseCase(qs)
    const result = await usecase.do()
    const response = new GetPairIndexResponse({ pairDTO: result })
    return response
  }
}

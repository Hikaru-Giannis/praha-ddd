import { Controller, Get, Inject } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { GetPairIndexUseCase } from 'src/app/pair/get-pair.index.usecase'
import { GetPairIndexResponse } from './response/get-pair-index-response'
import { tokens } from 'src/tokens'

@Controller('pair')
export class PairIndexController {
  constructor(
    @Inject(tokens.GetPairIndexUseCase)
    private getPairIndexUseCase: GetPairIndexUseCase,
  ) {}
  // memo: @ApiResponseを定義しておかないとSwaggerに出力されない
  @Get('index')
  @ApiResponse({ status: 200, type: GetPairIndexResponse })
  async getPairData(): Promise<GetPairIndexResponse> {
    const result = await this.getPairIndexUseCase.do()
    return new GetPairIndexResponse({ pairDTO: result })
  }
}

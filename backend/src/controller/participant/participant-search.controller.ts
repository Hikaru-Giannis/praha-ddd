import { Controller, Get, Inject, Param, Query } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { GetParticipantSearchUseCase } from 'src/app/participant/get-participant-search.usecase'
import { tokens } from 'src/tokens'
import { GetParticipantSearchResponse } from './response/get-participant-search-response'
import { SearchParticipantRequest } from './request/search-participant.request'

@Controller('participant')
export class ParticipantSearchController {
  constructor(
    @Inject(tokens.GetParticipantSearchUseCase)
    private readonly getParticipantSearchUseCase: GetParticipantSearchUseCase,
  ) {}
  @Get('search')
  @ApiResponse({ status: 200, type: GetParticipantSearchResponse })
  async findAll(
    @Query() params: SearchParticipantRequest,
  ): Promise<GetParticipantSearchResponse> {
    const result = await this.getParticipantSearchUseCase.do({
      status: params.status,
      taskIds: params.task_ids,
      page: params.page,
      limit: params.limit,
    })
    return new GetParticipantSearchResponse({
      participantSearchDTO: result.participants,
    })
  }
}

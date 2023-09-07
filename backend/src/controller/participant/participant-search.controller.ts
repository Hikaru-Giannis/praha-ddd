import { Controller, Get, Inject, Param, Query } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { GetParticipantSearchUseCase } from 'src/app/participant/get-participant-search.usecase'
import { tokens } from 'src/tokens'
import { GetParticipantSearchResponse } from './response/get-participant-search-response'
import { TaskProgressStatusType } from 'src/domain/task-progress/TaskProgressStatus'

@Controller('participant')
export class ParticipantSearchController {
  constructor(
    @Inject(tokens.GetParticipantSearchUseCase)
    private readonly getParticipantSearchUseCase: GetParticipantSearchUseCase,
  ) {}
  @Get('search')
  @ApiResponse({ status: 200, type: GetParticipantSearchResponse })
  async getSomeData(
    @Query('status') status: TaskProgressStatusType,
    @Query('task_ids') taskIds: string[],
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<GetParticipantSearchResponse> {
    const result = await this.getParticipantSearchUseCase.do({
      status,
      taskIds,
      page,
      limit,
    })
    return new GetParticipantSearchResponse({
      participantSearchDTO: result.participants,
    })
  }
}

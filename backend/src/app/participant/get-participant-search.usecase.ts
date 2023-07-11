import { Inject, Injectable } from '@nestjs/common'
import { IParticipantSearchQS } from './query-service-interface/participant-search.qs'
import { tokens } from 'src/tokens'
import {
  TaskProgressStatus,
  TaskProgressStatusType,
} from 'src/domain/task-progress/TaskProgressStatus'
import { TaskId } from 'src/domain/task/TaskId'

@Injectable()
export class GetParticipantSearchUseCase {
  constructor(
    @Inject(tokens.IParticipantSearchQS)
    private participantDataQS: IParticipantSearchQS,
  ) {}
  async do({
    status,
    taskIds,
    page,
    limit,
  }: {
    status: TaskProgressStatusType
    taskIds: string[]
    page: number
    limit: number
  }) {
    const participants = await this.participantDataQS.fetchByTaskProgressStatusAndTasks(
      new TaskProgressStatus(status),
      taskIds.map((id) => new TaskId(id)),
    )

    const offset = (page - 1) * limit
    const paginatedParticipants = participants.slice(offset, offset + limit)

    const paginatedParticipantsWithTaskIds = paginatedParticipants.map(
      (participant) => {
        const taskProgresses = participant.taskProgresses.filter(
          (taskProgress) => {
            return taskIds.includes(taskProgress.task_id)
          },
        )

        return {
          ...participant,
          taskProgresses,
        }
      },
    )

    return {
      participants: paginatedParticipantsWithTaskIds,
      totalCount: participants.length,
    }
  }
}

import { ITaskProgressRepository } from 'src/domain/task-progress/task-progress.repository'
import { TaskId } from 'src/domain/task/TaskId'
import { TaskProgressStatusType } from 'src/domain/task-progress/TaskProgressStatus'
import { ParticipantId } from 'src/domain/participant/ParticipantId'
import { Inject } from '@nestjs/common'
import { tokens } from 'src/tokens'

export class ChangeTaskProgressUseCase {
  constructor(
    @Inject(tokens.ITaskProgressRepository)
    private readonly taskProgressRepository: ITaskProgressRepository,
  ) {}

  async do(
    participantId: string,
    taskId: string,
    status: TaskProgressStatusType,
  ) {
    const taskProgress = await this.taskProgressRepository.findByTask(
      new TaskId(taskId),
      new ParticipantId(participantId),
    )

    if (!taskProgress) {
      throw new Error('TaskProgress is not found')
    }

    const newTaskProgress = taskProgress.changeStatus(status)
    await this.taskProgressRepository.save(newTaskProgress)
  }
}

import { Inject, Injectable } from '@nestjs/common'
import { ParticipantId } from '../participant/ParticipantId'
import { ITaskProgressRepository } from './task-progress.repository'
import { tokens } from 'src/tokens'
import { ITaskRepository } from '../task/task.repository'
import { TaskProgress } from './task-progress'

@Injectable()
export class AssignTaskProgressesService {
  constructor(
    @Inject(tokens.ITaskRepository)
    private readonly taskRepository: ITaskRepository,
    @Inject(tokens.ITaskProgressRepository)
    private readonly taskProgressRepository: ITaskProgressRepository,
  ) {}

  public async assign(participantId: ParticipantId): Promise<void> {
    const tasks = await this.taskRepository.findAll()
    const taskProgresses = tasks.map((task) => {
      return TaskProgress.create({
        taskId: task.id,
        participantId: participantId,
      })
    })

    await this.taskProgressRepository.saveMany(taskProgresses)
  }
}

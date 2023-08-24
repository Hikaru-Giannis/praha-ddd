import { Inject, Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { ParticipantId } from 'src/domain/participant/ParticipantId'
import { TaskProgress } from 'src/domain/task-progress/task-progress'
import { ITaskProgressRepository } from 'src/domain/task-progress/task-progress.repository'
import { TaskId } from 'src/domain/task/TaskId'
import { tokens } from 'src/tokens'

@Injectable()
export class TaskProgressRepository implements ITaskProgressRepository {
  public constructor(
    @Inject(tokens.PrismaClient)
    private prismaClient: PrismaClient,
  ) {}

  public async findByTask(
    taskId: TaskId,
    participantId: ParticipantId,
  ): Promise<TaskProgress | null> {
    const taskProgress = await this.prismaClient.taskProgress.findUnique({
      where: {
        task_id_participant_id: {
          task_id: taskId.value,
          participant_id: participantId.value,
        },
      },
    })
    return taskProgress
      ? TaskProgress.reconstruct({
          id: taskProgress.id,
          taskId: taskProgress.task_id,
          participantId: taskProgress.participant_id,
          status: taskProgress.status,
        })
      : null
  }

  public async findManyByParticipant(
    participantId: ParticipantId,
  ): Promise<TaskProgress[]> {
    const taskProgresses = await this.prismaClient.taskProgress.findMany({
      where: {
        participant_id: participantId.value,
      },
    })
    return taskProgresses.map((taskProgress) => {
      return TaskProgress.reconstruct({
        id: taskProgress.id,
        taskId: taskProgress.task_id,
        participantId: taskProgress.participant_id,
        status: taskProgress.status,
      })
    })
  }

  public async save(taskProgress: TaskProgress): Promise<void> {
    const allProperties = taskProgress.getAllProperties()
    await this.prismaClient.taskProgress.upsert({
      where: {
        id: taskProgress.id.value,
      },
      update: {
        status: allProperties.status,
      },
      create: {
        id: allProperties.id,
        task_id: allProperties.taskId,
        participant_id: allProperties.participantId,
        status: allProperties.status,
      },
    })
  }

  public async saveMany(taskProgresses: TaskProgress[]): Promise<void> {
    await this.prismaClient.taskProgress.createMany({
      data: taskProgresses.map((taskProgress) => {
        const allProperties = taskProgress.getAllProperties()
        return {
          id: allProperties.id,
          task_id: allProperties.taskId,
          participant_id: allProperties.participantId,
          status: allProperties.status,
        }
      }),
    })
  }
}

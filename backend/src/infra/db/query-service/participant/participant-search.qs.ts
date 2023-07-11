import { Inject, Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import {
  IParticipantSearchQS,
  ParticipantSearchDTO,
} from 'src/app/participant/query-service-interface/participant-search.qs'
import { TaskProgressStatus } from 'src/domain/task-progress/TaskProgressStatus'
import { TaskId } from 'src/domain/task/TaskId'
import { tokens } from 'src/tokens'

@Injectable()
export class ParticipantSearchQS implements IParticipantSearchQS {
  public constructor(
    @Inject(tokens.PrismaClient)
    private prismaClient: PrismaClient,
  ) {}

  public async fetchByTaskProgressStatusAndTasks(
    status: TaskProgressStatus,
    taskIds: TaskId[],
  ): Promise<ParticipantSearchDTO[]> {
    const participants = await this.prismaClient.participant.findMany({
      where: {
        taskProgresses: {
          some: {
            status: status.value,
            task_id: {
              in: taskIds.map((taskId) => taskId.value),
            },
          },
        },
      },
      include: {
        taskProgresses: {
          include: {
            task: true,
          },
        },
      },
    })

    return participants.map((participant) => {
      return new ParticipantSearchDTO({
        id: participant.id,
        name: participant.name,
        email: participant.email,
        taskProgresses: participant.taskProgresses.map((taskProgress) => {
          return {
            task_id: taskProgress.task.id,
            status: taskProgress.status,
          }
        }),
      })
    })
  }
}

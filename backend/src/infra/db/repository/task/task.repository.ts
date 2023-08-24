import { Inject, Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { TaskId } from 'src/domain/task/TaskId'
import { Task } from 'src/domain/task/task'
import { ITaskRepository } from 'src/domain/task/task.repository'
import { tokens } from 'src/tokens'

@Injectable()
export class TaskRepository implements ITaskRepository {
  public constructor(
    @Inject(tokens.PrismaClient)
    private prismaClient: PrismaClient,
  ) {}

  public async findById(id: TaskId): Promise<Task | null> {
    const task = await this.prismaClient.task.findUnique({
      where: {
        id: id.value,
      },
    })
    if (task === null) {
      return null
    }
    return Task.reconstruct({
      id: task.id,
      name: task.name,
    })
  }

  public async findAll(): Promise<Task[]> {
    const tasks = await this.prismaClient.task.findMany()
    return tasks.map((task) => {
      return Task.reconstruct({
        id: task.id,
        name: task.name,
      })
    })
  }
}

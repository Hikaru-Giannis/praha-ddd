import { TaskId } from 'src/domain/task/TaskId'
import { Task } from 'src/domain/task/task'
import { ITaskRepository } from 'src/domain/task/task.repository'

export class TaskInMemoryRepository implements ITaskRepository {
  public items: Task[] = []

  public async findById(id: TaskId): Promise<Task | null> {
    const task = this.items.find((item) => {
      const allProperties = item.getAllProperties()
      return allProperties.id === id.value
    })

    if (!task) {
      return null
    }

    return task
  }

  public async findAll(): Promise<Task[]> {
    return this.items
  }
}

import { TaskId } from '../task/TaskId'
import { Task } from './task'

export interface ITaskRepository {
  findById(id: TaskId): Promise<Task | null>
}

import { TaskId } from '../task/TaskId'
import { Task } from './task'

export interface ITaskRepository {
  findAll(): Promise<Task[]>
  findById(id: TaskId): Promise<Task | null>
}

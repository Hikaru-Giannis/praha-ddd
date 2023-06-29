import { ParticipantId } from '../participant/ParticipantId'
import { TaskId } from '../task/TaskId'
import { TaskProgress } from './task-progress'

export interface ITaskProgressRepository {
  findByTask(
    taskId: TaskId,
    participantId: ParticipantId,
  ): Promise<TaskProgress | null>
  save(taskProgress: TaskProgress): Promise<void>
}

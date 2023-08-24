import { ParticipantId } from '../participant/ParticipantId'
import { TaskId } from '../task/TaskId'
import { TaskProgress } from './task-progress'

export interface ITaskProgressRepository {
  findByTask(
    taskId: TaskId,
    participantId: ParticipantId,
  ): Promise<TaskProgress | null>
  findManyByParticipant(participantId: ParticipantId): Promise<TaskProgress[]>
  save(taskProgress: TaskProgress): Promise<void>
  saveMany(taskProgresses: TaskProgress[]): Promise<void>
}

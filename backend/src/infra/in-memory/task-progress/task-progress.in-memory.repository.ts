import { ParticipantId } from 'src/domain/participant/ParticipantId'
import { TaskProgress } from 'src/domain/task-progress/task-progress'
import { ITaskProgressRepository } from 'src/domain/task-progress/task-progress.repository'

export class TaskProgressInMemoryRepository implements ITaskProgressRepository {
  public items: TaskProgress[] = []

  public async findByTask(): Promise<TaskProgress | null> {
    // TODO
    return null
  }

  public async findManyByParticipant(
    participantId: ParticipantId,
  ): Promise<TaskProgress[]> {
    return this.items.filter((item) => {
      const allProperties = item.getAllProperties()
      return allProperties.participantId === participantId.value
    })
  }

  public async save(taskProgress: TaskProgress): Promise<void> {
    // TODO
    this.items.push(taskProgress)
  }

  public async saveMany(taskProgresses: TaskProgress[]): Promise<void> {
    // TODO
    taskProgresses.map((taskProgress) => {
      this.items.push(taskProgress)
    })
  }
}

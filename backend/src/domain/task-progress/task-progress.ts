import { createRandomIdString } from 'src/util/random'
import { ParticipantId } from '../participant/ParticipantId'
import { TaskProgressId } from './TaskProgressId'
import {
  TaskProgressStatus,
  TaskProgressStatusType,
} from './TaskProgressStatus'
import { TaskId } from '../task/TaskId'
import { DomainException } from '../error/domain.exception'

type CreateProps = {
  taskId: TaskId
  participantId: ParticipantId
}

type ReconstructProps = {
  id: string
  taskId: string
  participantId: string
  status: TaskProgressStatusType
}

export class TaskProgress {
  private constructor(
    public readonly id: TaskProgressId,
    private readonly taskId: TaskId,
    private readonly participantId: ParticipantId,
    private readonly status: TaskProgressStatus,
  ) {}

  static create({ taskId, participantId }: CreateProps) {
    return new TaskProgress(
      new TaskProgressId(createRandomIdString()),
      taskId,
      participantId,
      TaskProgressStatus.notStarted(),
    )
  }

  static reconstruct({ id, taskId, participantId, status }: ReconstructProps) {
    return new TaskProgress(
      new TaskProgressId(id),
      new TaskId(taskId),
      new ParticipantId(participantId),
      new TaskProgressStatus(status),
    )
  }

  public getAllProperties() {
    return {
      id: this.id.value,
      taskId: this.taskId.value,
      participantId: this.participantId.value,
      status: this.status.value,
    }
  }

  public changeStatus(status: TaskProgressStatusType): TaskProgress {
    if (this.status.isCompleted) {
      throw new DomainException('既に完了している課題は変更できません。')
    }
    return new TaskProgress(
      this.id,
      this.taskId,
      this.participantId,
      new TaskProgressStatus(status),
    )
  }
}

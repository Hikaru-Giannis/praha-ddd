import { DomainValidationError } from '../error/domain-validation.error'
import { TaskId } from './TaskId'
import { TaskName } from './TaskName'
import { TaskStatus, TaskStatusType } from './TaskStatus'

type ReconstructProps = {
  id: string
  name: string
  status: TaskStatusType
}

export class Task {
  private constructor(
    public readonly id: TaskId,
    public readonly name: TaskName,
    public readonly status: TaskStatus,
  ) {}

  static reconstruct({ id, name, status }: ReconstructProps) {
    return new Task(new TaskId(id), new TaskName(name), new TaskStatus(status))
  }

  public changeStatus(status: TaskStatusType): Task {
    if (this.status.isCompleted) {
      throw new DomainValidationError('既に完了している課題は変更できません。')
    }
    return new Task(this.id, this.name, new TaskStatus(status))
  }
}

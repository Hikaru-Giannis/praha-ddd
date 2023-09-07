import { TaskProgressStatus } from 'src/domain/task-progress/TaskProgressStatus'
import { TaskId } from 'src/domain/task/TaskId'

type CreateProps = {
  id: string
  name: string
  email: string
  taskProgresses: TaskProgress[]
}
type TaskProgress = {
  task_id: string
  status: string
}

export class ParticipantSearchDTO {
  public readonly id: string
  public readonly name: string
  public readonly email: string
  public readonly taskProgresses: TaskProgress[]
  public constructor(props: CreateProps) {
    this.id = props.id
    this.name = props.name
    this.email = props.email
    this.taskProgresses = props.taskProgresses
  }
}

export interface IParticipantSearchQS {
  fetchByTaskProgressStatusAndTasks(
    status: TaskProgressStatus,
    taskIds: TaskId[],
  ): Promise<ParticipantSearchDTO[]>
}

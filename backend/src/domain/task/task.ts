import { TaskId } from './TaskId'
import { TaskName } from './TaskName'

type ReconstructProps = {
  id: string
  name: string
}

export class Task {
  private constructor(
    public readonly id: TaskId,
    public readonly name: TaskName,
  ) {}

  static reconstruct({ id, name }: ReconstructProps) {
    return new Task(new TaskId(id), new TaskName(name))
  }

  public getAllProperties() {
    return {
      id: this.id.value,
      name: this.name.value,
    }
  }
}

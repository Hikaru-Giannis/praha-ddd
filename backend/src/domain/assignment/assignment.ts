type createAssignmentProps = {
  id: string
  assignmentName: string
}

export class Assignment {
  private readonly id: string
  private readonly assignmentName: string

  private constructor(id: string, assignmentName: string) {
    this.id = id
    this.assignmentName = assignmentName
  }

  static create({ id, assignmentName }: createAssignmentProps) {
    return new Assignment(id, assignmentName)
  }
}

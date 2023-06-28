import { DomainValidationError } from '../error/domain-validation.error'

export const TASK_STATUS = {
  NOT_STARTED: 'not_started',
  PENDING_REVIEW: 'pending_review',
  COMPLETED: 'completed',
} as const

export type TaskStatusType = typeof TASK_STATUS[keyof typeof TASK_STATUS]

export class TaskStatus {
  public readonly value: TaskStatusType
  public constructor(value: TaskStatusType) {
    if (!Object.values(TASK_STATUS).includes(value)) {
      throw new DomainValidationError('異常な状態値です。')
    }
    this.value = value
  }

  public static notStarted(): TaskStatus {
    return new TaskStatus(TASK_STATUS.NOT_STARTED)
  }

  public static pendingReview(): TaskStatus {
    return new TaskStatus(TASK_STATUS.PENDING_REVIEW)
  }

  public static completed(): TaskStatus {
    return new TaskStatus(TASK_STATUS.COMPLETED)
  }

  public get isNotStarted(): boolean {
    return this.value === TASK_STATUS.NOT_STARTED
  }

  public get isPendingReview(): boolean {
    return this.value === TASK_STATUS.PENDING_REVIEW
  }

  public get isCompleted(): boolean {
    return this.value === TASK_STATUS.COMPLETED
  }
}

import {
  TaskProgressStatus,
  TaskProgressStatusType,
} from '../TaskProgressStatus'

describe('TaskProgressStatus', () => {
  it('正常に作成できるか', () => {
    // Arrange
    const status = 'not_started' as TaskProgressStatusType

    // Act
    const taskProgressStatus = new TaskProgressStatus(status)

    // Assert
    expect(taskProgressStatus).toBeDefined()
    expect(taskProgressStatus.value).toBe(status)
  })

  it('異常なステータスを指定するとエラーになるか', () => {
    // Arrange
    const status = 'invalid_status' as TaskProgressStatusType

    // Act
    const taskProgressStatus = () => new TaskProgressStatus(status)

    // Assert
    expect(taskProgressStatus).toThrowError()
  })

  it('正常にnot_startedかどうか判定できるか', () => {
    // Arrange
    const status = 'not_started' as TaskProgressStatusType
    const taskProgressStatus = new TaskProgressStatus(status)

    // Act
    const isNotStarted = taskProgressStatus.isNotStarted

    // Assert
    expect(isNotStarted).toBe(true)
  })

  it('正常にpending_reviewかどうか判定できるか', () => {
    // Arrange
    const status = 'pending_review' as TaskProgressStatusType
    const taskProgressStatus = new TaskProgressStatus(status)

    // Act
    const isPendingReview = taskProgressStatus.isPendingReview

    // Assert
    expect(isPendingReview).toBe(true)
  })

  it('正常にcompletedかどうか判定できるか', () => {
    // Arrange
    const status = 'completed' as TaskProgressStatusType
    const taskProgressStatus = new TaskProgressStatus(status)

    // Act
    const isCompleted = taskProgressStatus.isCompleted

    // Assert
    expect(isCompleted).toBe(true)
  })

  it('正常にnot_startedに変更できるか', () => {
    // Act
    const changedTaskProgressStatus = TaskProgressStatus.notStarted()

    // Assert
    expect(changedTaskProgressStatus).toBeDefined()
    expect(changedTaskProgressStatus.value).toBe('not_started')
  })

  it('正常にpending_reviewに変更できるか', () => {
    // Act
    const changedTaskProgressStatus = TaskProgressStatus.pendingReview()

    // Assert
    expect(changedTaskProgressStatus).toBeDefined()
    expect(changedTaskProgressStatus.value).toBe('pending_review')
  })

  it('正常にcompletedに変更できるか', () => {
    // Act
    const changedTaskProgressStatus = TaskProgressStatus.completed()

    // Assert
    expect(changedTaskProgressStatus).toBeDefined()
    expect(changedTaskProgressStatus.value).toBe('completed')
  })
})

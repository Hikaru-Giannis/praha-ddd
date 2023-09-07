import { ParticipantId } from 'src/domain/participant/ParticipantId'
import { TaskId } from 'src/domain/task/TaskId'
import { ulid } from 'ulid'
import { TaskProgress } from '../task-progress'
import { TaskProgressStatusType } from '../TaskProgressStatus'

describe('TaskProgress', () => {
  it('正常に作成できるか', () => {
    // Arrange
    const props = {
      taskId: new TaskId(ulid()),
      participantId: new ParticipantId(ulid()),
    }

    // Act
    const taskProgress = TaskProgress.create(props)
    const allProperties = taskProgress.getAllProperties()

    // Assert
    expect(taskProgress).toBeDefined()
    expect(allProperties.taskId).toBe(props.taskId.value)
    expect(allProperties.participantId).toBe(props.participantId.value)
  })

  it('正常に再構築できるか', () => {
    // Arrange
    const props = {
      id: ulid(),
      taskId: ulid(),
      participantId: ulid(),
      status: 'not_started' as TaskProgressStatusType,
    }

    // Act
    const taskProgress = TaskProgress.reconstruct(props)
    const allProperties = taskProgress.getAllProperties()

    // Assert
    expect(taskProgress).toBeDefined()
    expect(allProperties.id).toBe(props.id)
    expect(allProperties.taskId).toBe(props.taskId)
    expect(allProperties.participantId).toBe(props.participantId)
    expect(allProperties.status).toBe(props.status)
  })

  it('ステータスを正常に変更できるか', () => {
    // Arrange
    const props = {
      taskId: new TaskId(ulid()),
      participantId: new ParticipantId(ulid()),
    }
    const taskProgress = TaskProgress.create(props)

    // Act
    const changedTaskProgress = taskProgress.changeStatus('completed')
    const allProperties = changedTaskProgress.getAllProperties()

    // Assert
    expect(changedTaskProgress).toBeDefined()
    expect(allProperties.status).toBe('completed')
  })

  it('既に完了している課題のステータスを変更しようとするとエラーになるか', () => {
    // Arrange
    const props = {
      taskId: new TaskId(ulid()),
      participantId: new ParticipantId(ulid()),
    }
    const taskProgress = TaskProgress.create(props)
    const changedTaskProgress = taskProgress.changeStatus('completed')

    // Act
    const act = () => changedTaskProgress.changeStatus('not_started')

    // Assert
    expect(act).toThrowError('既に完了している課題は変更できません。')
  })
})

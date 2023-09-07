import { ParticipantId } from 'src/domain/participant/ParticipantId'
import { AssignTaskProgressesService } from '../assign-task-progresses.service'
import { TaskProgressInMemoryRepository } from 'src/infra/in-memory/task-progress/task-progress.in-memory.repository'
import { createRandomIdString } from 'src/util/random'
import { TaskInMemoryRepository } from 'src/infra/in-memory/task/task.in-memory.repository'
import { Task } from 'src/domain/task/task'
import { Test, TestingModule } from '@nestjs/testing'
import { tokens } from 'src/tokens'

describe('進捗割り当てサービステスト', () => {
  let testApp: TestingModule

  beforeEach(async () => {
    testApp = await Test.createTestingModule({
      providers: [
        {
          provide: tokens.ITaskRepository,
          useClass: TaskInMemoryRepository,
        },
        {
          provide: tokens.AssignTaskProgressesService,
          useClass: AssignTaskProgressesService,
        },
        {
          provide: tokens.ITaskProgressRepository,
          useClass: TaskProgressInMemoryRepository,
        },
      ],
    }).compile()
  })
  test('80個の課題に対して、進捗を割り当てる', async () => {
    // arrange
    const participantId = new ParticipantId(createRandomIdString())
    const taskInMemoryRepository = testApp.get(tokens.ITaskRepository)

    // 80個のタスクを作成
    taskInMemoryRepository.items = Array.from({ length: 80 }).map((_, i) => {
      return Task.reconstruct({
        id: createRandomIdString(),
        name: `タスク${i}`,
      })
    })

    // act
    const assignTaskProgressesService = testApp.get(
      tokens.AssignTaskProgressesService,
    )
    await assignTaskProgressesService.assign(participantId)

    // assert
    const taskProgressRepository = testApp.get(tokens.ITaskProgressRepository)
    const taskProgresses = await taskProgressRepository.findManyByParticipant(
      participantId,
    )

    expect(taskProgresses.length).toBe(80)
  })
})

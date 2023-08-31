import { ulid } from 'ulid'
import { Task } from '../task'

describe('Task', () => {
  it('正しい値で Task が再構築されるか', () => {
    const id = ulid()
    const name = 'Task Name'
    const task = Task.reconstruct({ id, name })
    expect(task.id.value).toBe(id)
    expect(task.name.value).toBe(name)
  })

  it('全てのプロパティを取得できるか', () => {
    const id = ulid()
    const name = 'Task Name'
    const task = Task.reconstruct({ id, name })
    expect(task.id.value).toBe(id)
    expect(task.name.value).toBe(name)
  })
})

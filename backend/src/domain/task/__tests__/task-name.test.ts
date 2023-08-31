import { DomainValidationError } from 'src/domain/error/domain-validation.error'
import { TaskName } from '../TaskName'

describe('TaskName', () => {
  it('正常な課題名の場合', () => {
    // Arrange
    const taskName = new TaskName('テスト課題')
    // Act
    // Assert
    expect(taskName.value.length).toBeGreaterThanOrEqual(1)
    expect(taskName.value.length).toBeLessThanOrEqual(255)
  })

  it('空文字の課題名の場合は、例外を投げるか', () => {
    // Arrange
    // Act
    // Assert
    expect(() => new TaskName('')).toThrow(DomainValidationError)
  })

  it('256文字以上の課題名の場合は、例外を投げるか', () => {
    // Arrange
    const taskName = new Array(257).join('a')
    // Act
    // Assert
    expect(() => new TaskName(taskName)).toThrow(DomainValidationError)
  })
})

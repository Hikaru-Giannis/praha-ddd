import { DomainValidationError } from '../error/domain-validation.error'

export class TaskName {
  public readonly value: string
  constructor(value: string) {
    // 1文字以上255文字以内の文字列であること
    if (value.length < 1 || value.length > 255) {
      throw new DomainValidationError(
        '課題名は1文字以上255文字以内で入力してください。',
      )
    }
    this.value = value
  }

  public equals(taskName: TaskName): boolean {
    return this.value === taskName.value
  }
}

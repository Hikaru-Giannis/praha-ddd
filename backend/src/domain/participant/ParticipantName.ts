import { DomainValidationException } from '../error/domain-validation.exception'

export class ParticipantName {
  public readonly value: string
  constructor(value: string) {
    // 1文字以上255文字以内の文字列であること
    if (value.length < 1 || value.length > 255) {
      throw new DomainValidationException(
        '名前は1文字以上255文字以内で入力してください。',
      )
    }
    this.value = value
  }

  public equals(participantName: ParticipantName): boolean {
    return this.value === participantName.value
  }
}

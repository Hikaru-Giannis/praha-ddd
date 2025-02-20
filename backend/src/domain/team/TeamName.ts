import { DomainValidationException } from '../error/domain-validation.exception'

export class TeamName {
  public readonly value: string
  public constructor(value: string) {
    // 名前は数字のみ
    if (!value.match(/^[0-9]+$/)) {
      throw new DomainValidationException('名前は数字のみです')
    }
    // 名前は3文字以下
    if (value.length > 3) {
      throw new DomainValidationException('名前は3文字以下です')
    }

    this.value = value
  }

  public equals(other: TeamName): boolean {
    return this.value === other.value
  }
}

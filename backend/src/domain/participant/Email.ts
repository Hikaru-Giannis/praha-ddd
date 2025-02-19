import { DomainValidationException } from '../error/domain-validation.exception'

export class Email {
  public readonly value
  constructor(value: string) {
    if (!this.validateEmail(value)) {
      throw new DomainValidationException(
        'メールアドレスの形式が正しくありません。',
      )
    }

    this.value = value
  }

  private validateEmail(value: string): boolean {
    const re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    return re.test(value)
  }

  public equals(email: Email): boolean {
    return this.value === email.value
  }
}

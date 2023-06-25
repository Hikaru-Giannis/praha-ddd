export class Email {
  public readonly value
  constructor(value: string) {
    if (!this.validateEmail(value)) {
      throw new Error('Invalid email format')
    }

    this.value = value
  }

  private validateEmail(value: string): boolean {
    // 簡単なメールのバリデーション。より厳密なチェックが必要な場合は更新してください
    const re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    return re.test(value)
  }

  public equals(email: Email): boolean {
    return this.value === email.value
  }
}

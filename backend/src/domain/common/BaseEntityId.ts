export abstract class BaseEntityId {
  public readonly value: string

  constructor(value: string) {
    if (!this.validateUlId(value)) {
      throw new Error('Value is not a valid UlId')
    }
    this.value = value
  }

  private validateUlId(value: string): boolean {
    if (value.length !== 26) {
      return false
    }

    const validUlIdCharacters = /^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]*$/
    if (!validUlIdCharacters.test(value)) {
      return false
    }

    return true
  }

  equals(id: BaseEntityId): boolean {
    return this.value.toLowerCase() === id.value.toLowerCase()
  }
}

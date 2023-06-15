export class PairName {
  private constructor(public readonly value: string) {
    // 名前は英字のみ
    if (!value.match(/^[a-zA-Z]+$/)) {
      throw new Error('名前は英字のみです')
    }
    // 名前は1文字
    if (value.length !== 1) {
      throw new Error('名前は1文字です')
    }
  }

  static create(value: string) {
    return new PairName(value)
  }

  getValue() {
    return this.value
  }
}

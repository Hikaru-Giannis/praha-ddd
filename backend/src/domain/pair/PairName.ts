export class PairName {
  public readonly value: string
  public constructor(value: string) {
    // 名前は英字のみ
    if (!value.match(/^[a-zA-Z]+$/)) {
      throw new Error('名前は英字のみです')
    }
    // 名前は1文字
    if (value.length !== 1) {
      throw new Error('名前は1文字です')
    }

    this.value = value
  }

  static get first(): PairName {
    return new PairName('A')
  }

  get next(): PairName {
    if (this.isLast) {
      throw new Error('最後のペア名です')
    }
    const nextCharCode = this.value.charCodeAt(0) + 1
    return new PairName(String.fromCharCode(nextCharCode))
  }

  private get isLast(): boolean {
    return this.value === 'Z'
  }
}

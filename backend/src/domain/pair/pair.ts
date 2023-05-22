type PairCreateProps = {
  id: string
  teamId: string
  pairName: string
}

export class Pair {
  private constructor(
    private readonly id: string,
    private readonly teamId: string,
    private readonly pairName: string,
  ) {
    // 名前は英字のみ
    if (!pairName.match(/^[a-zA-Z]+$/)) {
      throw new Error('名前は英字のみです')
    }
    // 名前は1文字
    if (pairName.length !== 1) {
      throw new Error('名前は1文字です')
    }

    this.id = id
    this.teamId = teamId
    this.pairName = pairName
  }

  static create({ id, teamId, pairName }: PairCreateProps) {
    return new Pair(id, teamId, pairName)
  }
}

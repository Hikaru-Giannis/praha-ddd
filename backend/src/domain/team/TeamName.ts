export class TeamName {
  private constructor(public readonly value: string) {}

  static create(teamName: string): TeamName {
    // 名前は数字のみ
    if (!teamName.match(/^[0-9]+$/)) {
      throw new Error('名前は数字のみです')
    }
    // 名前は3文字以下
    if (teamName.length > 3) {
      throw new Error('名前は3文字以下です')
    }
    return new TeamName(teamName)
  }

  public equals(other: TeamName): boolean {
    return this.value === other.value
  }
}

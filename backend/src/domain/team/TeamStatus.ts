// チームステータスの値オブジェクト
type TeamStatusType = 'active' | 'inactive' | 'disbanded'

export class TeamStatus {
  private constructor(public readonly value: TeamStatusType) {}

  public static active(): TeamStatus {
    return new TeamStatus('active')
  }

  public static inactive(): TeamStatus {
    return new TeamStatus('inactive')
  }

  public static disbanded(): TeamStatus {
    return new TeamStatus('disbanded')
  }

  public isInactive(): boolean {
    return this.value === 'inactive'
  }
}

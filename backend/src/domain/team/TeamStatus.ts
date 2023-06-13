const TEAM_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DISBANDED: 'disbanded',
} as const
type TeamStatusType = typeof TEAM_STATUS[keyof typeof TEAM_STATUS]

export class TeamStatus {
  private constructor(public readonly value: TeamStatusType) {}

  public static active(): TeamStatus {
    return new TeamStatus(TEAM_STATUS.ACTIVE)
  }

  public static inactive(): TeamStatus {
    return new TeamStatus(TEAM_STATUS.INACTIVE)
  }

  public static disbanded(): TeamStatus {
    return new TeamStatus(TEAM_STATUS.DISBANDED)
  }

  public isActive(): boolean {
    return this.value === TEAM_STATUS.ACTIVE
  }

  public isInactive(): boolean {
    return this.value === TEAM_STATUS.INACTIVE
  }

  public isDisbanded(): boolean {
    return this.value === TEAM_STATUS.DISBANDED
  }
}

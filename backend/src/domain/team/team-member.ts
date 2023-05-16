type TeamMemberCreateProps = {
  teamId: string
  participantId: string
}

export class TeamMember {
  private constructor(
    private readonly teamId: string,
    private readonly participantId: string,
  ) {}

  static create({ teamId, participantId }: TeamMemberCreateProps) {
    return new TeamMember(teamId, participantId)
  }
}

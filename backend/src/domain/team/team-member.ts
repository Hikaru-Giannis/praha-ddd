type createTeamMemberProps = {
  id: string
  teamId: string
  participantId: string
}

export class TeamMember {
  private constructor(
    private readonly id: string,
    private readonly teamId: string,
    private readonly participantId: string,
  ) {}

  static create({ id, teamId, participantId }: createTeamMemberProps) {
    return new TeamMember(id, teamId, participantId)
  }
}

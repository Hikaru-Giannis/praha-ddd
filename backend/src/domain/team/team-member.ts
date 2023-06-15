import { createRandomIdString } from 'src/util/random'

type createTeamMemberProps = {
  teamId: string
  participantId: string
}

type reconstructTeamMemberProps = {
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

  static create({ teamId, participantId }: createTeamMemberProps) {
    return new TeamMember(createRandomIdString(), teamId, participantId)
  }

  static reconstruct({
    id,
    teamId,
    participantId,
  }: reconstructTeamMemberProps) {
    return new TeamMember(id, teamId, participantId)
  }

  public get getAllProperties() {
    return {
      id: this.id,
      teamId: this.teamId,
      participantId: this.participantId,
    }
  }
}

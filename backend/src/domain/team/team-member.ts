import { createRandomIdString } from 'src/util/random'

type createTeamMemberProps = {
  participantId: string
}

type reconstructTeamMemberProps = {
  id: string
  participantId: string
}

export class TeamMember {
  private constructor(
    public readonly id: string,
    public readonly participantId: string,
  ) {}

  static create({ participantId }: createTeamMemberProps) {
    return new TeamMember(createRandomIdString(), participantId)
  }

  static reconstruct({ id, participantId }: reconstructTeamMemberProps) {
    return new TeamMember(id, participantId)
  }

  public get getAllProperties() {
    return {
      id: this.id,
      participantId: this.participantId,
    }
  }

  public equals(participantId: string): boolean {
    return this.participantId === participantId
  }
}

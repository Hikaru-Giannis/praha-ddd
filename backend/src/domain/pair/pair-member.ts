import { createRandomIdString } from 'src/util/random'
import { TeamMember } from '../team/team-member'

type CreatePairMemberProps = {
  participantId: string
  teamId: string
}

type ReconstructPairMemberProps = {
  id: string
  participantId: string
  teamId: string
}

export class PairMember {
  private constructor(
    public readonly id: string,
    private readonly participantId: string,
    private readonly teamId: string,
  ) {}

  static create({ participantId, teamId }: CreatePairMemberProps) {
    return new PairMember(createRandomIdString(), participantId, teamId)
  }

  static reconstruct({
    id,
    participantId,
    teamId,
  }: ReconstructPairMemberProps) {
    return new PairMember(id, participantId, teamId)
  }

  public get getAllProperties() {
    return {
      id: this.id,
      participantId: this.participantId,
    }
  }

  public equals(teamMember: TeamMember): boolean {
    return teamMember.equals(this.participantId)
  }
}

import { ParticipantStatusType } from 'src/domain/participant/ParticipantStatus'

type CreateProps = {
  id: string
  name: string
  email: string
  status: ParticipantStatusType
  teamMember: TeamMember | null
  pairMember: PairMember | null
}

type TeamMember = {
  id: string
  participant_id: string
  team_id: string
  team: Team
}

type Team = {
  id: string
  name: string
}

type PairMember = {
  id: string
  pair_id: string
  participant_id: string
  pair: Pair
}

type Pair = {
  id: string
  team_id: string
  name: string
}

export class ParticipantDTO {
  public readonly id: string
  public readonly name: string
  public readonly email: string
  public readonly status: ParticipantStatusType
  public readonly team?: Team
  public readonly pair?: Pair
  public constructor(props: CreateProps) {
    this.id = props.id
    this.name = props.name
    this.email = props.email
    this.status = props.status
    this.team = props.teamMember?.team
    this.pair = props.pairMember?.pair
  }
}

export interface IParticipantQS {
  fetchAll(): Promise<ParticipantDTO[]>
}

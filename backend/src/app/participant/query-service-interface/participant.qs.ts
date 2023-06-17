import { Status } from 'src/domain/participant/participant'

type createProps = {
  id: string
  name: string
  email: string
  status: Status
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
  public readonly status: Status
  public readonly team?: Team
  public readonly pair?: Pair
  public constructor(props: createProps) {
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

type createProps = {
  id: string
  name: string
  status: string
  team: Team
  pairMembers: PairMember[]
}

type PairMember = {
  id: string
  name: string
  email: string
}

type Participant = {
  id: string
  name: string
  email: string
}

type Team = {
  id: string
  name: string
  status: string
}

export class PairDto {
  public readonly id: string
  public readonly name: string
  public readonly team: Team
  public readonly pairMembers: Participant[]

  public constructor(props: createProps) {
    this.id = props.id
    this.name = props.name
    this.team = props.team
    this.pairMembers =
      props.pairMembers?.map((pairMember) => {
        return {
          id: pairMember.id,
          name: 'name',
          email: 'email',
        }
      }) ?? []
  }
}

export interface IPairQS {
  fetchAll(): Promise<PairDto[]>
}

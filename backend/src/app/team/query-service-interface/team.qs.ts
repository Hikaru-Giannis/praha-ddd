type createProps = {
  id: string
  name: string
  status: string
  teamMembers: TeamMember[]
}

type TeamMember = {
  id: string
  name: string
  email: string
}

type Participant = {
  id: string
  name: string
  email: string
}

export class TeamDTO {
  public readonly id: string
  public readonly name: string
  public readonly status: string
  public readonly teamMembers: Participant[]

  public constructor(props: createProps) {
    this.id = props.id
    this.name = props.name
    this.status = props.status
    this.teamMembers =
      props.teamMembers?.map((teamMember) => {
        return {
          id: teamMember.id,
          name: 'name',
          email: 'email',
        }
      }) ?? []
  }
}

export interface ITeamQS {
  fetchAll(): Promise<TeamDTO[]>
}

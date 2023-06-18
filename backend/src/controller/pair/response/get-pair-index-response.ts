import { ApiProperty } from '@nestjs/swagger'
import { PairDto } from 'src/app/pair/query-service-interface/pair.qs'

export class GetPairIndexResponse {
  @ApiProperty({ type: () => [Pair] })
  pairs: Pair[]

  public constructor(params: { pairDTO: PairDto[] }) {
    const { pairDTO } = params
    this.pairs = pairDTO.map((pair) => {
      return new Pair({
        id: pair.id,
        name: pair.name,
        team: pair.team,
        pairMembers:
          pair.pairMembers.map((pairMember) => {
            return {
              id: pairMember.id,
              name: pairMember.name,
              email: pairMember.email,
            }
          }) ?? [],
      })
    })
  }
}

class Pair {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  team: {
    id: string
    name: string
    status: string
  }

  @ApiProperty()
  pairMembers: {
    id: string
    name: string
  }[]

  public constructor(params: {
    id: string
    name: string
    team: {
      id: string
      name: string
      status: string
    }
    pairMembers: {
      id: string
      name: string
    }[]
  }) {
    this.id = params.id
    this.name = params.name
    this.team = params.team
    this.pairMembers = params.pairMembers ?? []
  }
}

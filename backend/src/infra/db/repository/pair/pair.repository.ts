import { Inject, Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { PairName } from 'src/domain/pair/PairName'
import { Pair } from 'src/domain/pair/pair'
import { IPairRepository } from 'src/domain/pair/pair.repository'
import { tokens } from 'src/tokens'

@Injectable()
export class PairRepository implements IPairRepository {
  public constructor(
    @Inject(tokens.PrismaClient)
    private prismaClient: PrismaClient,
  ) {}

  public async fetchByTeamId(teamId: string) {
    const pairs = await this.prismaClient.pair.findMany({
      where: { team_id: teamId },
    })

    return pairs.map((pair) =>
      Pair.reconstruct({
        ...pair,
        teamId: pair.team_id,
        pairName: new PairName(pair.name),
      }),
    )
  }

  public async save(pair: Pair): Promise<void> {
    const allProperties = pair.getAllProperties

    await this.prismaClient.pair.upsert({
      where: { id: pair.id },
      update: {
        team_id: allProperties.teamId,
        name: allProperties.pairName.value,
      },
      create: {
        id: allProperties.id,
        team_id: allProperties.teamId,
        name: allProperties.pairName.value,
      },
    })
  }
}

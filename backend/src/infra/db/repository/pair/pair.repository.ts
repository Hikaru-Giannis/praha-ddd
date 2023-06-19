import { Inject, Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { PairName } from 'src/domain/pair/PairName'
import { Pair } from 'src/domain/pair/pair'
import { PairMember } from 'src/domain/pair/pair-member'
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
      include: { members: true },
    })

    return pairs.map((pair) =>
      Pair.reconstruct({
        ...pair,
        teamId: pair.team_id,
        pairName: new PairName(pair.name),
        pairMembers: pair.members.map((member) =>
          PairMember.reconstruct({
            ...member,
            participantId: member.participant_id,
          }),
        ),
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

    await Promise.all(
      allProperties.pairMembers.map(async (pairMember) => {
        await this.prismaClient.pairMember.upsert({
          where: { id: pairMember.id },
          update: {
            pair_id: pair.id,
            participant_id: pairMember.participantId,
          },
          create: {
            id: pairMember.id,
            pair_id: pair.id,
            participant_id: pairMember.participantId,
          },
        })
      }),
    )
  }
}

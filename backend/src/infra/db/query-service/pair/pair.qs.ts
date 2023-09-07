import { Inject, Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { IPairQS, PairDto } from 'src/app/pair/query-service-interface/pair.qs'
import { tokens } from 'src/tokens'

@Injectable()
export class PairQS implements IPairQS {
  public constructor(
    @Inject(tokens.PrismaClient)
    private prismaClient: PrismaClient,
  ) {}

  public async fetchAll(): Promise<PairDto[]> {
    // ペアメンバーと参加者を取得する
    const pairs = await this.prismaClient.pair.findMany({
      include: {
        team: true,
        members: {
          include: {
            participant: true,
          },
        },
      },
    })

    // ペアメンバーと参加者を結合する
    const pairDTOs = pairs.map((pair) => {
      const pairMembers = pair.members.map((member) => {
        return {
          id: member.participant.id,
          name: member.participant.name,
          email: member.participant.email,
        }
      })
      return {
        id: pair.id,
        name: pair.name,
        team: {
          id: pair.team.id,
          name: pair.team.name,
          status: pair.team.status,
        },
        pairMembers,
      }
    })

    return pairDTOs
  }
}

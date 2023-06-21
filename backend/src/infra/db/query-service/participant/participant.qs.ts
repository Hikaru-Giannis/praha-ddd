import { Inject, Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import {
  IParticipantQS,
  ParticipantDTO,
} from 'src/app/participant/query-service-interface/participant.qs'
import { tokens } from 'src/tokens'

@Injectable()
export class ParticipantQS implements IParticipantQS {
  public constructor(
    @Inject(tokens.PrismaClient)
    private prismaClient: PrismaClient,
  ) {}

  public async fetchAll(): Promise<ParticipantDTO[]> {
    const participantsWithTeams = await this.prismaClient.participant.findMany({
      include: {
        teamMember: {
          include: {
            team: true,
          },
        },
        pairMember: {
          include: {
            pair: {
              include: {
                team: true,
              },
            },
          },
        },
      },
    })

    return participantsWithTeams.map((participantWithTeams) => {
      return new ParticipantDTO({
        ...participantWithTeams,
      })
    })
  }
}

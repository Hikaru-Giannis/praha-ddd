import { PrismaClient } from '@prisma/client'
import {
  IParticipantQS,
  ParticipantDTO,
} from 'src/app/participant/query-service-interface/participant.qs'

export class ParticipantQS implements IParticipantQS {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async fetchAll(): Promise<ParticipantDTO[]> {
    const participantsWithTeams = await this.prismaClient.participant.findMany({
      include: {
        teamMember: {
          include: {
            team: true,
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

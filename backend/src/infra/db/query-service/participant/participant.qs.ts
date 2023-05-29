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
    const allParticipants = await this.prismaClient.participant.findMany()
    return allParticipants.map(
      (participantDM) =>
        new ParticipantDTO({
          ...participantDM,
        }),
    )
  }
}

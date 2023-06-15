import { Inject, Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { Participant } from 'src/domain/participant/participant'
import { IParticipantRepository } from 'src/domain/participant/participant.repository'
import { tokens } from 'src/tokens'

@Injectable()
export class ParticipantRepository implements IParticipantRepository {
  public constructor(
    @Inject(tokens.PrismaClient)
    private prismaClient: PrismaClient,
  ) {}

  public async findById(id: string): Promise<Participant> {
    const participant = await this.prismaClient.participant.findUnique({
      where: { id },
    })
    if (!participant) {
      throw new Error('参加者が見つかりませんでした')
    }
    return Participant.reconstruct(participant)
  }

  public async findByEmail(email: string): Promise<Participant | null> {
    console.log(email)
    return null
  }

  public async save(participant: Participant): Promise<void> {
    await this.prismaClient.participant.upsert({
      where: { id: participant.id },
      update: participant.getAllProperties(),
      create: participant.getAllProperties(),
    })
  }
}

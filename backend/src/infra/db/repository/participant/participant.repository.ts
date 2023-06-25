import { Inject, Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { Email } from 'src/domain/participant/Email'
import { Participant } from 'src/domain/participant/participant'
import { IParticipantRepository } from 'src/domain/participant/participant.repository'
import { tokens } from 'src/tokens'

@Injectable()
export class ParticipantRepository implements IParticipantRepository {
  public constructor(
    @Inject(tokens.PrismaClient)
    private prismaClient: PrismaClient,
  ) {}

  public async findById(id: string): Promise<Participant | null> {
    const participant = await this.prismaClient.participant.findUnique({
      where: { id },
    })
    return participant ? Participant.reconstruct(participant) : null
  }

  public async findByEmail(email: Email): Promise<Participant | null> {
    const participant = await this.prismaClient.participant.findUnique({
      where: { email: email.value },
    })
    return participant ? Participant.reconstruct(participant) : null
  }

  public async save(participant: Participant): Promise<void> {
    await this.prismaClient.participant.upsert({
      where: { id: participant.id.value },
      update: participant.getAllProperties(),
      create: participant.getAllProperties(),
    })
  }
}

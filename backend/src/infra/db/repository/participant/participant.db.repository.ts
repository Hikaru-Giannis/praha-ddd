import { Inject, Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { Email } from 'src/domain/participant/Email'
import { ParticipantId } from 'src/domain/participant/ParticipantId'
import { Participant } from 'src/domain/participant/participant'
import { IParticipantRepository } from 'src/domain/participant/participant.repository'
import { tokens } from 'src/tokens'

@Injectable()
export class ParticipantDbRepository implements IParticipantRepository {
  public constructor(
    @Inject(tokens.PrismaClient)
    private prismaClient: PrismaClient,
  ) {}

  public async findAll(): Promise<Participant[]> {
    const participants = await this.prismaClient.participant.findMany()
    return participants.map((participant) =>
      Participant.reconstruct(participant),
    )
  }

  public async findById(id: ParticipantId): Promise<Participant | null> {
    const participant = await this.prismaClient.participant.findUnique({
      where: { id: id.value },
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

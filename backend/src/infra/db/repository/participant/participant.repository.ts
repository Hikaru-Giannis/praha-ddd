import { PrismaClient } from '@prisma/client'
import { Participant } from 'src/domain/participant/participant'
import { IParticipantRepository } from 'src/domain/participant/participant.repository'

export class ParticipantRepository implements IParticipantRepository {
  private prismClient: PrismaClient
  public constructor(prismClient: PrismaClient) {
    this.prismClient = prismClient
  }

  public async findById(id: string): Promise<Participant> {
    const participant = await this.prismClient.participant.findUnique({
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
    await this.prismClient.participant.upsert({
      where: { id: participant.id },
      update: participant.getAllProperties(),
      create: participant.getAllProperties(),
    })
  }
}

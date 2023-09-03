import { Email } from 'src/domain/participant/Email'
import { ParticipantId } from 'src/domain/participant/ParticipantId'
import { Participant } from 'src/domain/participant/participant'
import { IParticipantRepository } from 'src/domain/participant/participant.repository'

export class ParticipantInMemoryRepository implements IParticipantRepository {
  public items: Participant[] = []

  public async findAll(): Promise<Participant[]> {
    return this.items
  }

  public async findById(
    participantId: ParticipantId,
  ): Promise<Participant | null> {
    const participant = this.items.find(
      (participant) => participant.id === participantId,
    )
    return participant || null
  }

  public async findByEmail(email: Email): Promise<Participant | null> {
    const participant = this.items.find((participant) =>
      participant.email.equals(email),
    )
    return participant || null
  }

  public async save(participant: Participant): Promise<void> {
    const index = this.items.findIndex((item) => item.id === participant.id)
    if (index === -1) {
      this.items.push(participant)
    } else {
      this.items[index] = participant
    }
  }
}

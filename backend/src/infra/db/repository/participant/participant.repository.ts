import { Injectable } from '@nestjs/common'
import { Participant } from 'src/domain/participant/participant'
import { IParticipantRepository } from 'src/domain/participant/participant.repository'

@Injectable()
export class ParticipantRepository implements IParticipantRepository {
  public async findByEmail(email: string): Promise<Participant | null> {
    console.log(email)
    return null
  }

  public async save(participant: Participant): Promise<void> {
    console.log(participant)
  }
}

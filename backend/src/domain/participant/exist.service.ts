import { Participant } from './participant'
import { IParticipantRepository } from './participant.repository'

export class ExistService {
  constructor(private readonly participantRepository: IParticipantRepository) {}

  async exist(participant: Participant): Promise<boolean> {
    const duplicatedParticipant = await this.participantRepository.findByEmail(
      participant.email,
    )
    return duplicatedParticipant === null
  }
}

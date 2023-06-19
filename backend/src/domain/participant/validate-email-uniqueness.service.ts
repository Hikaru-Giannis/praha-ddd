import { Participant } from './participant'
import { IParticipantRepository } from './participant.repository'

export class ValidateEmailUniquenessService {
  constructor(private readonly participantRepository: IParticipantRepository) {}

  async isUnique(participant: Participant): Promise<boolean> {
    const duplicatedParticipant = await this.participantRepository.findByEmail(
      participant.email,
    )
    return duplicatedParticipant === null
  }
}

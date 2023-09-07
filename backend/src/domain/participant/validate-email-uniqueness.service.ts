import { Inject, Injectable } from '@nestjs/common'
import { Participant } from './participant'
import { IParticipantRepository } from './participant.repository'
import { tokens } from 'src/tokens'

@Injectable()
export class ValidateEmailUniquenessService {
  constructor(
    @Inject(tokens.IParticipantRepository)
    private readonly participantRepository: IParticipantRepository,
  ) {}

  async isUnique(participant: Participant): Promise<boolean> {
    const duplicatedParticipant = await this.participantRepository.findByEmail(
      participant.email,
    )
    return duplicatedParticipant === null
  }
}

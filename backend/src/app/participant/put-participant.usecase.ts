import { Inject, Injectable } from '@nestjs/common'
import { Status } from 'src/domain/participant/participant'
import { IParticipantRepository } from 'src/domain/participant/participant.repository'
import { tokens } from 'src/tokens'

@Injectable()
export class PutParticipantUseCase {
  constructor(
    @Inject(tokens.IParticipantRepository)
    private readonly participantRepository: IParticipantRepository,
  ) {}
  async do(participantId: string, status: Status) {
    try {
      const participant = await this.participantRepository.findById(
        participantId,
      )
      if (!participant) {
        throw new Error('Participant not found')
      }
      const newParticipant = participant.changeStatus(status)
      await this.participantRepository.save(newParticipant)
    } catch (error) {
      throw error
    }
  }
}

import { Inject, Injectable } from '@nestjs/common'
import { DomainValidationError } from 'src/domain/error/domain-validation.error'
import { ParticipantStatusType } from 'src/domain/participant/ParticipantStatus'
import { IParticipantRepository } from 'src/domain/participant/participant.repository'
import { tokens } from 'src/tokens'

@Injectable()
export class PutParticipantUseCase {
  constructor(
    @Inject(tokens.IParticipantRepository)
    private readonly participantRepository: IParticipantRepository,
  ) {}
  async do(participantId: string, status: ParticipantStatusType) {
    const participant = await this.participantRepository.findById(participantId)
    if (!participant) {
      throw new DomainValidationError('参加者が存在しません。')
    }
    const newParticipant = participant.changeStatus(status)
    await this.participantRepository.save(newParticipant)
  }
}

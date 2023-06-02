import { Status } from 'src/domain/participant/participant'
import { IParticipantRepository } from 'src/domain/participant/participant.repository'

export class PutParticipantUseCase {
  private readonly participantRepository
  constructor(participantRepository: IParticipantRepository) {
    this.participantRepository = participantRepository
  }
  async do(participantId: string, status: Status) {
    try {
      const participant = await this.participantRepository.findById(
        participantId,
      )
      const newParticipant = participant.changeStatus(status)
      await this.participantRepository.save(newParticipant)
    } catch (error) {
      // memo: エラー処理
      throw error
    }
  }
}

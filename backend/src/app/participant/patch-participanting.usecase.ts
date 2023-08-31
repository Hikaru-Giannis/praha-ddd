import { Inject, Injectable } from '@nestjs/common'
import { DomainValidationException } from 'src/domain/error/domain-validation.exception'
import { AssignPairService } from 'src/domain/pair/assign-pair.service'
import { ParticipantStatusType } from 'src/domain/participant/ParticipantStatus'
import { IParticipantRepository } from 'src/domain/participant/participant.repository'
import { AssignTeamService } from 'src/domain/team/assign-team.service'
import { tokens } from 'src/tokens'

@Injectable()
export class PatchParticipantingUseCase {
  constructor(
    @Inject(tokens.IParticipantRepository)
    private readonly participantRepository: IParticipantRepository,
    @Inject(tokens.AssignTeamService)
    private readonly assignTeamService: AssignTeamService,
    @Inject(tokens.AssignPairService)
    private readonly assignPairService: AssignPairService,
  ) {}

  async do(participantId: string, status: ParticipantStatusType) {
    const participant = await this.participantRepository.findById(participantId)
    if (!participant) {
      throw new DomainValidationException('参加者が存在しません。')
    }
    const updatedParticipant = participant.changeStatus(status)
    await this.participantRepository.save(updatedParticipant)

    // チームとペアを再割り当てする
    await this.assignTeamService.assign(updatedParticipant)
    await this.assignPairService.assign(updatedParticipant)
  }
}

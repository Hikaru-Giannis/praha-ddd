import { Inject, Injectable } from '@nestjs/common'
import { DomainException } from 'src/domain/error/domain.exception'
import { AssignPairService } from 'src/domain/pair/assign-pair.service'
import { NoPairFoundToAssignException } from 'src/domain/pair/no-pair-found-to-assign.exception'
import { ParticipantId } from 'src/domain/participant/ParticipantId'
import { ParticipantStatusType } from 'src/domain/participant/ParticipantStatus'
import { IParticipantRepository } from 'src/domain/participant/participant.repository'
import { AssignTeamService } from 'src/domain/team/assign-team.service'
import { NoTeamFoundToAssignException } from 'src/domain/team/no-team-found-to-assign.exception'
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
    try {
      const participant = await this.participantRepository.findById(
        new ParticipantId(participantId),
      )
      if (!participant) {
        throw new DomainException('参加者が存在しません。')
      }
      const updatedParticipant = participant.changeStatus(status)
      await this.participantRepository.save(updatedParticipant)

      // チームとペアを再割り当てする
      await this.assignTeamService.assign(updatedParticipant)
      await this.assignPairService.assign(updatedParticipant)
    } catch (error) {
      if (error instanceof NoTeamFoundToAssignException) {
        // TODO 管理者に通知
      }

      if (error instanceof NoPairFoundToAssignException) {
        // TODO 管理者に通知
      }
    }
  }
}

import { Inject, Injectable } from '@nestjs/common'
import { EmailSender } from 'src/domain/email/email-sender'
import { DomainException } from 'src/domain/error/domain.exception'
import { AssignPairService } from 'src/domain/pair/assign-pair.service'
import { NoPairFoundAssignMail } from 'src/domain/pair/no-pair-found-assign.mail'
import { NoPairFoundToAssignException } from 'src/domain/pair/no-pair-found-to-assign.exception'
import { ParticipantId } from 'src/domain/participant/ParticipantId'
import { ParticipantStatusType } from 'src/domain/participant/ParticipantStatus'
import { IParticipantRepository } from 'src/domain/participant/participant.repository'
import { AssignTeamService } from 'src/domain/team/assign-team.service'
import { NoTeamFoundAssignMail } from 'src/domain/team/no-team-found-assign.mail'
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
    @Inject(tokens.EmailSender)
    private readonly emailSender: EmailSender,
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
        // 管理者に通知
        const noTeamFoundAssignMail = new NoTeamFoundAssignMail()
        await this.emailSender.send(noTeamFoundAssignMail)
      }

      if (error instanceof NoPairFoundToAssignException) {
        // 管理者に通知
        const noPairFoundAssignMail = new NoPairFoundAssignMail()
        await this.emailSender.send(noPairFoundAssignMail)
      }
    }
  }
}

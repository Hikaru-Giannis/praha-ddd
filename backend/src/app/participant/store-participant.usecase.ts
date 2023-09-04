import { AssignPairService } from 'src/domain/pair/assign-pair.service'
import { ValidateEmailUniquenessService } from 'src/domain/participant/validate-email-uniqueness.service'
import { Participant } from 'src/domain/participant/participant'
import { IParticipantRepository } from 'src/domain/participant/participant.repository'
import { AssignTeamService } from 'src/domain/team/assign-team.service'
import { Inject, Injectable } from '@nestjs/common'
import { tokens } from 'src/tokens'
import { DomainValidationException } from 'src/domain/error/domain-validation.exception'
import { AssignTaskProgressesService } from 'src/domain/task-progress/assign-task-progresses.service'
import { NoTeamFoundToAssignException } from 'src/domain/team/no-team-found-to-assign.exception'
import { NoPairFoundToAssignException } from 'src/domain/pair/no-pair-found-to-assign.exception'
import { NoTeamFoundAssignMail } from 'src/domain/team/no-team-found-assign.mail'
import { EmailSender } from 'src/domain/email/email-sender'
import { NoPairFoundAssignMail } from 'src/domain/pair/no-pair-found-assign.mail'

type StoreParticipantProps = {
  name: string
  email: string
}

@Injectable()
export class StoreParticipantUseCase {
  public constructor(
    @Inject(tokens.IParticipantRepository)
    private readonly participantRepository: IParticipantRepository,
    @Inject(tokens.ValidateEmailUniquenessService)
    private readonly validateEmailUniquenessService: ValidateEmailUniquenessService,
    @Inject(tokens.AssignTeamService)
    private readonly assignTeamService: AssignTeamService,
    @Inject(tokens.AssignPairService)
    private readonly assignPairService: AssignPairService,
    @Inject(tokens.AssignTaskProgressesService)
    private readonly assignTaskProgressesService: AssignTaskProgressesService,
    @Inject(tokens.EmailSender)
    private readonly emailSender: EmailSender,
  ) {}

  public async do({ name, email }: StoreParticipantProps) {
    const participant = Participant.create({
      name,
      email,
    })

    try {
      // メールアドレスの重複チェック
      if (
        (await this.validateEmailUniquenessService.isUnique(participant)) ===
        false
      ) {
        throw new DomainValidationException('参加者は既に存在しています')
      }

      // 参加者を保存
      await this.participantRepository.save(participant)

      // チーム割り当て
      await this.assignTeamService.assign(participant)

      // ペア割り当て
      await this.assignPairService.assign(participant)

      // 進捗割り当て
      await this.assignTaskProgressesService.assign(participant.id)
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

      throw error
    }
  }
}

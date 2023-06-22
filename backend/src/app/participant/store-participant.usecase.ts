import { AssignPairService } from 'src/domain/pair/assign-pair.service'
import { IPairRepository } from 'src/domain/pair/pair.repository'
import { ValidateEmailUniquenessService } from 'src/domain/participant/validate-email-uniqueness.service'
import { Participant } from 'src/domain/participant/participant'
import { IParticipantRepository } from 'src/domain/participant/participant.repository'
import { AssignTeamService } from 'src/domain/team/assign-team.service'
import { ITeamRepository } from 'src/domain/team/team.repository'
import { Inject, Injectable } from '@nestjs/common'
import { tokens } from 'src/tokens'

type StoreParticipantProps = {
  name: string
  email: string
}

@Injectable()
export class StoreParticipantUseCase {
  public constructor(
    @Inject(tokens.IParticipantRepository)
    private readonly participantRepository: IParticipantRepository,
    @Inject(tokens.ITeamRepository)
    private readonly teamRepository: ITeamRepository,
    @Inject(tokens.IPairRepository)
    private readonly pairRepository: IPairRepository,
    @Inject(tokens.ValidateEmailUniquenessService)
    private readonly validateEmailUniquenessService: ValidateEmailUniquenessService,
  ) {}

  public async do({ name, email }: StoreParticipantProps) {
    const participant = Participant.create({
      name,
      email,
    })

    // メールアドレスの重複チェック
    if (
      (await this.validateEmailUniquenessService.isUnique(participant)) ===
      false
    ) {
      throw new Error('参加者は既に存在しています')
    }

    // 参加者を保存
    await this.participantRepository.save(participant)

    // チーム割り当て
    const assignTeamService = new AssignTeamService(this.teamRepository)
    const team = await assignTeamService.assign(participant)
    if (!team) {
      throw new Error('チームの割り当てに失敗しました')
    }
    this.teamRepository.save(team)

    // ペア割り当て
    const assignPairService = new AssignPairService(this.pairRepository)
    const pairs = await assignPairService.assign(participant, team)
    if (!pairs) {
      throw new Error('ペアの割り当てに失敗しました')
    }
    pairs.map((pair) => {
      this.pairRepository.save(pair)
    })
  }
}

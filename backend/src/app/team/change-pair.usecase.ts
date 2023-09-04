import { Inject, Injectable } from '@nestjs/common'
import { EmailSender } from 'src/domain/email/email-sender'
import { DomainException } from 'src/domain/error/domain.exception'
import { PairId } from 'src/domain/pair/PairId'
import { IPairRepository } from 'src/domain/pair/pair.repository'
import { TeamId } from 'src/domain/team/TeamId'
import { InvalidTeamException } from 'src/domain/team/invalid-team.exception'
import { InvalidTeamMail } from 'src/domain/team/invalid-team.mail'
import { ITeamRepository } from 'src/domain/team/team.repository'
import { tokens } from 'src/tokens'

@Injectable()
export class ChangePairUseCase {
  constructor(
    @Inject(tokens.ITeamRepository)
    private readonly teamRepository: ITeamRepository,
    @Inject(tokens.IPairRepository)
    private readonly pairRepository: IPairRepository,
    @Inject(tokens.EmailSender)
    private readonly emailSender: EmailSender,
  ) {}

  async do(teamId: string, pairId: string) {
    try {
      const team = await this.teamRepository.findById(new TeamId(teamId))
      if (team === null) {
        throw new DomainException('チームが存在しません')
      }

      const pair = await this.pairRepository.findById(new PairId(pairId))
      if (pair === null) {
        throw new DomainException('ペアが存在しません')
      }

      const oldTeam = await this.teamRepository.findById(pair.teamId)
      if (oldTeam === null) {
        throw new DomainException('ペアが所属しているチームが存在しません')
      }

      const [newTeam, movedTeamMembers] = oldTeam.moveTeamMember(pair)
      // 移動元のチームを保存
      await this.teamRepository.save(newTeam)
      if (newTeam.isInactive) {
        throw new InvalidTeamException('無効なチームが発生しました', newTeam)
      }

      // 移動先のチームを保存
      const movedTeam = team.assignTeamMembers(movedTeamMembers)
      await this.teamRepository.save(movedTeam)
      if (movedTeam.isInactive) {
        throw new InvalidTeamException('無効なチームが発生しました', movedTeam)
      }

      // ペアの所属チームを変更
      const newPair = pair.changeTeam(team.id)
      await this.pairRepository.save(newPair)
    } catch (error) {
      if (error instanceof InvalidTeamException) {
        // 管理者にメール
        const invalidTeamMail = new InvalidTeamMail(error.team)
        await this.emailSender.send(invalidTeamMail)
      }
      throw error
    }
  }
}

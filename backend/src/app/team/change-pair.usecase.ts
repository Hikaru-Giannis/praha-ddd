import { Inject, Injectable } from '@nestjs/common'
import { IPairRepository } from 'src/domain/pair/pair.repository'
import { ITeamRepository } from 'src/domain/team/team.repository'
import { tokens } from 'src/tokens'

@Injectable()
export class ChangePairUseCase {
  constructor(
    @Inject(tokens.ITeamRepository)
    private readonly teamRepository: ITeamRepository,
    @Inject(tokens.IPairRepository)
    private readonly pairRepository: IPairRepository,
  ) {}

  async do(teamId: string, pairId: string) {
    const team = await this.teamRepository.findById(teamId)
    if (!team) {
      throw new Error('チームが存在しません。')
    }

    const pair = await this.pairRepository.findById(pairId)
    if (!pair) {
      throw new Error('ペアが存在しません。')
    }

    const oldTeam = await this.teamRepository.findByPair(pair)
    if (!oldTeam) {
      throw new Error('ペアが所属しているチームが存在しません。')
    }

    const [newTeam, movedTeamMembers] = oldTeam.moveTeamMember(pair)
    // 移動元のチームを保存
    await this.teamRepository.save(newTeam)
    if (newTeam.isInactive) {
      // TODO 管理者にメール
    }

    // 移動先のチームを保存
    const movedTeam = team.assignTeamMembers(movedTeamMembers)
    await this.teamRepository.save(movedTeam)
    if (movedTeam.isInactive) {
      // TODO 管理者にメール
    }

    // ペアの所属チームを変更
    const newPair = pair.changeTeam(team.id)
    await this.pairRepository.save(newPair)
  }
}

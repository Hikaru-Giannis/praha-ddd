import { Inject, Injectable } from '@nestjs/common'
import { DomainException } from 'src/domain/error/domain.exception'
import { AssignPairService } from 'src/domain/pair/assign-pair.service'
import { IPairRepository } from 'src/domain/pair/pair.repository'
import { ParticipantId } from 'src/domain/participant/ParticipantId'
import { ParticipantStatusType } from 'src/domain/participant/ParticipantStatus'
import { IParticipantRepository } from 'src/domain/participant/participant.repository'
import { ITeamRepository } from 'src/domain/team/team.repository'
import { tokens } from 'src/tokens'

@Injectable()
export class PatchAdjourningUseCase {
  constructor(
    @Inject(tokens.IParticipantRepository)
    private readonly participantRepository: IParticipantRepository,
    @Inject(tokens.ITeamRepository)
    private readonly teamRepository: ITeamRepository,
    @Inject(tokens.IPairRepository)
    private readonly pairRepository: IPairRepository,
    @Inject(tokens.AssignPairService)
    private readonly assignPairService: AssignPairService,
  ) {}

  async do(participantId: string, status: ParticipantStatusType) {
    try {
      const participant = await this.participantRepository.findById(
        new ParticipantId(participantId),
      )
      if (!participant) {
        throw new DomainException('参加者が存在しません')
      }
      const updatedParticipant = participant.changeStatus(status)
      await this.participantRepository.save(updatedParticipant)

      // 所属しているチームを取得
      const team = await this.teamRepository.findByParticipantId(
        updatedParticipant.id,
      )
      if (team === null) {
        throw new DomainException('チームが存在しません')
      }

      // チームメンバーから、自分を削除
      const removedTeam = team.removeTeamMember(updatedParticipant.id)
      await this.teamRepository.save(removedTeam)
      if (removedTeam.isInactive) {
        // TODO 管理者にメール送信
      }

      // 所属しているペアを取得
      const pair = await this.pairRepository.findByParticipantId(
        updatedParticipant.id,
      )
      if (pair === null) {
        throw new DomainException('ペアが存在しません')
      }

      // ペアメンバーから、自分を削除
      const removedPair = pair.removePairMember(updatedParticipant.id)
      if (removedPair.isActive === false) {
        // そのペアが無効になった場合、残りのメンバーを取得
        const participants = await this.participantRepository.findAll()
        const remainParticipant = participants.find((participant) =>
          removedPair.hasPairMember(participant.id),
        )
        if (remainParticipant) {
          // 残りのメンバーを同チーム内の他のペアに割り当てる
          await this.assignPairService.assign(remainParticipant)
        }
        // 属していたペアを削除
        await this.pairRepository.delete(removedPair)
      } else {
        // ペアが有効な場合、ペアを更新
        await this.pairRepository.save(removedPair)
      }
    } catch (error) {}
  }
}

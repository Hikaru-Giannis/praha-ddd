import { Inject, Injectable } from '@nestjs/common'
import { DomainValidationError } from 'src/domain/error/domain-validation.error'
import { AssignPairService } from 'src/domain/pair/assign-pair.service'
import { IPairRepository } from 'src/domain/pair/pair.repository'
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
    const participant = await this.participantRepository.findById(participantId)
    if (!participant) {
      throw new DomainValidationError('参加者が存在しません。')
    }
    const updatedParticipant = participant.changeStatus(status)
    // 所属チームから削除
    const teams = await this.teamRepository.fetchAll()
    const team = teams.find((team) => team.hasTeamMember(updatedParticipant.id))
    if (team) {
      const removedTeam = team.removeTeamMember(updatedParticipant.id)
      await this.teamRepository.save(removedTeam)
      if (removedTeam.isInactive) {
        // TODO 管理者にメール送信
      }

      // 所属ペアから削除
      const pairs = await this.pairRepository.fetchAll()
      const pair = pairs.find((pair) =>
        pair.hasPairMember(updatedParticipant.id),
      )
      if (pair) {
        const removedPair = pair.removePairMember(updatedParticipant.id)
        if (removedPair.isActive === false) {
          const participants = await this.participantRepository.fetchAll()
          const remainParticipant = participants.find((participant) =>
            removedPair.hasPairMember(participant.id),
          )
          if (remainParticipant) {
            const assignedPairs = await this.assignPairService.assign(
              remainParticipant,
              team,
            )
            await assignedPairs.map(async (pair) => {
              await this.pairRepository.save(pair)
            })
          }
          await this.pairRepository.delete(removedPair)
        } else {
          await this.pairRepository.save(removedPair)
        }
      }
    }
    await this.participantRepository.save(updatedParticipant)
  }
}

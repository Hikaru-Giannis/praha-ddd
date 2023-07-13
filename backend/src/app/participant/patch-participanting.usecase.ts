import { Inject, Injectable } from '@nestjs/common'
import { DomainValidationError } from 'src/domain/error/domain-validation.error'
import { AssignPairService } from 'src/domain/pair/assign-pair.service'
import { IPairRepository } from 'src/domain/pair/pair.repository'
import { ParticipantStatusType } from 'src/domain/participant/ParticipantStatus'
import { IParticipantRepository } from 'src/domain/participant/participant.repository'
import { AssignTeamService } from 'src/domain/team/assign-team.service'
import { ITeamRepository } from 'src/domain/team/team.repository'
import { tokens } from 'src/tokens'

@Injectable()
export class PatchParticipantingUseCase {
  constructor(
    @Inject(tokens.IParticipantRepository)
    private readonly participantRepository: IParticipantRepository,
    @Inject(tokens.ITeamRepository)
    private readonly teamRepository: ITeamRepository,
    @Inject(tokens.IPairRepository)
    private readonly pairRepository: IPairRepository,
    @Inject(tokens.AssignTeamService)
    private readonly assignTeamService: AssignTeamService,
    @Inject(tokens.AssignPairService)
    private readonly assignPairService: AssignPairService,
  ) {}

  async do(participantId: string, status: ParticipantStatusType) {
    const participant = await this.participantRepository.findById(participantId)
    if (!participant) {
      throw new DomainValidationError('参加者が存在しません。')
    }
    const updatedParticipant = participant.changeStatus(status)
    const newTeam = await this.assignTeamService.assign(updatedParticipant)

    await this.teamRepository.save(newTeam)
    const newPairs = await this.assignPairService.assign(
      updatedParticipant,
      newTeam,
    )

    await Promise.all(newPairs.map((pair) => this.pairRepository.save(pair)))
  }
}

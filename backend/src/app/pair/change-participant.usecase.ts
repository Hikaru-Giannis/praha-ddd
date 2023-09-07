import { Inject, Injectable } from '@nestjs/common'
import { tokens } from 'src/tokens'
import { IParticipantRepository } from 'src/domain/participant/participant.repository'
import { IPairRepository } from 'src/domain/pair/pair.repository'
import { PairId } from 'src/domain/pair/PairId'
import { ParticipantId } from 'src/domain/participant/ParticipantId'
import { DomainException } from 'src/domain/error/domain.exception'

@Injectable()
export class ChangePaiticipantUseCase {
  constructor(
    @Inject(tokens.IParticipantRepository)
    private readonly participantRepository: IParticipantRepository,
    @Inject(tokens.IPairRepository)
    private readonly pairRepository: IPairRepository,
  ) {}

  async do(participantId: string, pairId: string) {
    const participant = await this.participantRepository.findById(
      new ParticipantId(participantId),
    )
    if (!participant) {
      throw new DomainException('参加者が存在しません')
    }

    // 移動前のペア
    const currentPair = await this.pairRepository.findByParticipantId(
      participant.id,
    )
    if (!currentPair) {
      throw new DomainException('移動元ペアが存在しません')
    }

    // 移動後のペア
    const destinationPair = await this.pairRepository.findById(
      new PairId(pairId),
    )
    if (!destinationPair) {
      throw new DomainException('移動先ペアが存在しません')
    }

    // 移動前のペアから移動参加者を削除
    const [currentPairWithoutMember, pairMember] = currentPair.movePairMember(
      participant.id,
    )
    await this.pairRepository.save(currentPairWithoutMember)

    // 移動後のペアに移動参加者を追加
    const destinationPairWithNewMember = destinationPair.assignPairMember(
      pairMember,
    )
    await this.pairRepository.save(destinationPairWithNewMember)
  }
}

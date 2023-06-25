import { Inject, Injectable } from '@nestjs/common'
import { tokens } from 'src/tokens'
import { IParticipantRepository } from 'src/domain/participant/participant.repository'
import { IPairRepository } from 'src/domain/pair/pair.repository'

@Injectable()
export class ChangePaiticipantUseCase {
  constructor(
    @Inject(tokens.IParticipantRepository)
    private readonly participantRepository: IParticipantRepository,
    @Inject(tokens.IPairRepository)
    private readonly pairRepository: IPairRepository,
  ) {}

  async do(participantId: string, pairId: string) {
    const participant = await this.participantRepository.findById(participantId)
    if (!participant) {
      throw new Error('Participant is not found')
    }

    const allPairs = await this.pairRepository.fetchAll()

    // 移動前のペア
    const currentPair = allPairs.find((pair) =>
      pair.hasPairMember(participant.id),
    )

    if (!currentPair) {
      throw new Error('Pair is not found')
    }

    // 移動後のペア
    const destinationPair = allPairs.find((pair) => pair.id === pairId)
    if (!destinationPair) {
      throw new Error('Pair is not found')
    }

    // 移動前のペアからペアメンバーを削除
    const [currentPairWithoutMember, pairMember] = currentPair.movePairMember(
      participant.id,
    )
    await this.pairRepository.save(currentPairWithoutMember)

    // 移動後のペアにペアメンバーを追加
    const destinationPairWithNewMember = destinationPair.assignPairMember(
      pairMember,
    )
    await this.pairRepository.save(destinationPairWithNewMember)
  }
}

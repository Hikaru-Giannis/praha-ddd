import { Inject, Injectable } from '@nestjs/common'
import { tokens } from 'src/tokens'
import { IParticipantRepository } from 'src/domain/participant/participant.repository'
import { IPairRepository } from 'src/domain/pair/pair.repository'
import { PairId } from 'src/domain/pair/PairId'

@Injectable()
export class ChangePaiticipantUseCase {
  constructor(
    @Inject(tokens.IParticipantRepository)
    private readonly participantRepository: IParticipantRepository,
    @Inject(tokens.IPairRepository)
    private readonly pairRepository: IPairRepository,
  ) {}

  async do(participantId: string, pairId: string) {
    // TODO トランザクション

    const participant = await this.participantRepository.findById(participantId)
    if (!participant) {
      throw new Error('参加者が存在しません。')
    }

    const allPairs = await this.pairRepository.fetchAll()

    // 移動前のペア
    const currentPair = allPairs.find((pair) =>
      pair.hasPairMember(participant.id),
    )
    if (!currentPair) {
      throw new Error('所属ペアが存在しません。')
    }

    // 移動後のペア
    const destinationPair = allPairs.find((pair) =>
      pair.id.equals(new PairId(pairId)),
    )
    if (!destinationPair) {
      throw new Error('移動先ペアが存在しません。')
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

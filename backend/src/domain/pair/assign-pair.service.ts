import { IPairRepository } from './pair.repository'
import { Participant } from '../participant/participant'

export class AssignPairSerice {
  constructor(private readonly pairRepository: IPairRepository) {}

  public async assign(participant: Participant) {
    // TODO ペアを割り当てる
  }
}

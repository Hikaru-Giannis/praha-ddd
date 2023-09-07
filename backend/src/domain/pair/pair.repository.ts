import { ParticipantId } from '../participant/ParticipantId'
import { TeamId } from '../team/TeamId'
import { PairId } from './PairId'
import { Pair } from './pair'

export interface IPairRepository {
  findById(pairId: PairId): Promise<Pair | null>
  findByParticipantId(participantId: ParticipantId): Promise<Pair | null>
  findManyByTeamId(teamId: TeamId): Promise<Pair[]>
  findAll(): Promise<Pair[]>
  save(pair: Pair): Promise<void>
  delete(pair: Pair): Promise<void>
}

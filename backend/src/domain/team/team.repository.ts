import { Pair } from '../pair/pair'
import { ParticipantId } from '../participant/ParticipantId'
import { Team } from './team'

export interface ITeamRepository {
  findById(id: string): Promise<Team | null>
  findByParticipantId(participantId: ParticipantId): Promise<Team | null>
  findByPair(pair: Pair): Promise<Team | null>
  fetchAll(): Promise<Team[]>
  save(team: Team): Promise<void>
}

import { ParticipantId } from '../participant/ParticipantId'
import { TeamId } from './TeamId'
import { Team } from './team'

export interface ITeamRepository {
  findById(id: TeamId): Promise<Team | null>
  findByParticipantId(participantId: ParticipantId): Promise<Team | null>
  findAll(): Promise<Team[]>
  save(team: Team): Promise<void>
}

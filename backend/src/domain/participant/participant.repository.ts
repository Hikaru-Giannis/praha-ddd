import { Email } from './Email'
import { ParticipantId } from './ParticipantId'
import { Participant } from './participant'

export interface IParticipantRepository {
  findAll(): Promise<Participant[]>
  findById(participantId: ParticipantId): Promise<Participant | null>
  findByEmail(email: Email): Promise<Participant | null>
  save(participant: Participant): Promise<void>
}

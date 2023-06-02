import { Participant } from './participant'

export interface IParticipantRepository {
  findById(id: string): Promise<Participant>
  findByEmail(email: string): Promise<Participant | null>
  save(participant: Participant): Promise<void>
}

import { Participant } from './participant'

export interface IParticipantRepository {
  findByEmail(email: string): Promise<Participant | null>
  save(participant: Participant): Promise<void>
}

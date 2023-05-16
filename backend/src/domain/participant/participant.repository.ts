import { Participant } from './participant'

export interface IParticipantRepository {
  findByEmail(email: string): Promise<Participant | null>
}

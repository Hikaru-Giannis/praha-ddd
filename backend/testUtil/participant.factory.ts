import { Participant } from 'src/domain/participant/participant'

export function createMockParticipant(): Participant {
  return ({
    id: 'participant1',
  } as unknown) as Participant
}

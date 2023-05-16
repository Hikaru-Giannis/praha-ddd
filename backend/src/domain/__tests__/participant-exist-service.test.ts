import { ExistService } from '../participant/exist.service'
import { Participant } from '../participant/participant'
import { IParticipantRepository } from '../participant/participant.repository'

describe('ExistService', () => {
  let existService: ExistService
  let participantRepository: IParticipantRepository

  const participant = Participant.create({
    id: '1',
    name: 'test',
    email: 'participant@example.com',
    status: 'participating',
  })

  beforeEach(() => {
    participantRepository = {
      findByEmail: jest.fn(),
    }

    existService = new ExistService(participantRepository)
  })

  it('should return true when participant does not exist', async () => {
    jest.spyOn(participantRepository, 'findByEmail').mockResolvedValue(null)

    expect(await existService.exist(participant)).toBe(true)
  })

  it('should return false when participant exists', async () => {
    jest
      .spyOn(participantRepository, 'findByEmail')
      .mockResolvedValue(participant)

    expect(await existService.exist(participant)).toBe(false)
  })
})

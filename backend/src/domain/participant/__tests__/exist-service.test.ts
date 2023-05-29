import { ExistService } from '../exist.service'
import { IParticipantRepository } from '../participant.repository'
import { Participant } from '../participant'

describe('ExistService', () => {
  let existService: ExistService
  let participantRepository: IParticipantRepository

  const participant = Participant.create({
    name: 'test',
    email: 'participant@example.com',
  })

  beforeEach(() => {
    participantRepository = {
      findByEmail: jest.fn(),
      save: jest.fn(),
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

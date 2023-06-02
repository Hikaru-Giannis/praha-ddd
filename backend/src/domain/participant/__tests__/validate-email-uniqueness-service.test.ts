import { ValidateEmailUniquenessService } from '../validate-email-uniqueness.service'
import { IParticipantRepository } from '../participant.repository'
import { Participant } from '../participant'

describe('ValidateEmailUniquenessService', () => {
  let validateEmailUniquenessService: ValidateEmailUniquenessService
  let participantRepository: IParticipantRepository

  const participant = Participant.create({
    name: 'test',
    email: 'participant@example.com',
  })

  beforeEach(() => {
    participantRepository = {
      findById: jest.fn(),
      findByEmail: jest.fn(),
      save: jest.fn(),
    }

    validateEmailUniquenessService = new ValidateEmailUniquenessService(
      participantRepository,
    )
  })

  it('should return true when participant does not exist', async () => {
    jest.spyOn(participantRepository, 'findByEmail').mockResolvedValue(null)

    expect(await validateEmailUniquenessService.do(participant)).toBe(true)
  })

  it('should return false when participant exists', async () => {
    jest
      .spyOn(participantRepository, 'findByEmail')
      .mockResolvedValue(participant)

    expect(await validateEmailUniquenessService.do(participant)).toBe(false)
  })
})

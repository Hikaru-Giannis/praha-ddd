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

  it('参加者が存在しない場合、trueを返す', async () => {
    jest.spyOn(participantRepository, 'findByEmail').mockResolvedValue(null)
    expect(await validateEmailUniquenessService.isUnique(participant)).toBe(
      true,
    )
  })

  it('参加者が存在する場合、falseを返す', async () => {
    jest
      .spyOn(participantRepository, 'findByEmail')
      .mockResolvedValue(participant)

    expect(await validateEmailUniquenessService.isUnique(participant)).toBe(
      false,
    )
  })
})

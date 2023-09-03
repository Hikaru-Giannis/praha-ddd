import { ValidateEmailUniquenessService } from '../validate-email-uniqueness.service'
import { Participant } from '../participant'
import { Test, TestingModule } from '@nestjs/testing'
import { tokens } from 'src/tokens'
import { ParticipantInMemoryRepository } from 'src/infra/in-memory/participant/participant.in-memory.repository'

describe('ValidateEmailUniquenessService', () => {
  let testApp: TestingModule
  let participant: Participant

  beforeEach(async () => {
    participant = Participant.create({
      name: 'test test',
      email: 'test@example.com',
    })

    testApp = await Test.createTestingModule({
      providers: [
        {
          provide: tokens.IParticipantRepository,
          useClass: ParticipantInMemoryRepository,
        },
        {
          provide: tokens.ValidateEmailUniquenessService,
          useClass: ValidateEmailUniquenessService,
        },
      ],
    }).compile()
  })

  it('参加者が存在しない場合、trueを返す', async () => {
    const validateEmailUniquenessService = testApp.get(
      tokens.ValidateEmailUniquenessService,
    )
    const participantRepository = testApp.get(tokens.IParticipantRepository)
    participantRepository.items = []

    expect(await validateEmailUniquenessService.isUnique(participant)).toBe(
      true,
    )
  })

  it('参加者が存在する場合、falseを返す', async () => {
    const validateEmailUniquenessService = testApp.get(
      tokens.ValidateEmailUniquenessService,
    )
    const participantRepository = testApp.get(tokens.IParticipantRepository)
    participantRepository.items = [participant]

    expect(await validateEmailUniquenessService.isUnique(participant)).toBe(
      false,
    )
  })
})

import { Participant, STATUS } from 'src/domain/participant/participant'
import { AssignTeamService } from '../assign-team.service'
import { ITeamRepository } from '../team.repository'
import { Team } from '../team'
import { createRandomIdString } from 'src/util/random'

jest.mock('src/domain/participant/participant')
jest.mock('../team-member')
jest.mock('../team')
jest.mock('src/util/random', () => ({
  createRandomIdString: () => 'randomId',
}))

describe('AssignTeamService', () => {
  let mockRepo: jest.Mocked<ITeamRepository>
  let service: AssignTeamService

  beforeEach(() => {
    mockRepo = {
      fetchAll: jest.fn(),
      save: jest.fn(),
    }

    service = new AssignTeamService(mockRepo)
  })

  it('assigns participant to existing inactive team', async () => {
    const participant = Participant.create({
      name: 'participantName',
      email: 'participantEmail',
    })
    const team = Team.create({
      teamName: 'teamName',
      teamMembers: [],
    })

    team.isInactive = jest.fn().mockReturnValue(true)
    mockRepo.fetchAll.mockResolvedValue([team])

    await service.assign(participant)

    expect(mockRepo.save).toHaveBeenCalled()
  })

  it('creates a new team if no inactive team exists', async () => {
    const participant = Participant.create({
      name: 'participantName',
      email: 'participantEmail',
    })

    mockRepo.fetchAll.mockResolvedValue([])

    await service.assign(participant)

    expect(mockRepo.save).toHaveBeenCalled()
  })
})

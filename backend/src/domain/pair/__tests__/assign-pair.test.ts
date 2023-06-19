import { Participant } from 'src/domain/participant/participant'
import { Pair } from '../pair'
import { Team } from 'src/domain/team/team'
import { PairMember } from '../pair-member'
import { AssignPairService } from '../assign-pair.service'
import { IPairRepository } from '../pair.repository'
import { TeamName } from 'src/domain/team/TeamName'

describe('AssignPairService', () => {
  let service: AssignPairService

  // Mocking the Pair Repository
  const mockPairRepository: IPairRepository = {
    fetchByTeamId: jest.fn(),
    save: jest.fn(),
  }

  // Mock Participant, Team, and PairMember data
  const participant = Participant.create({
    name: 'Participant Name',
    email: 'test@example.com',
  })
  const team = Team.create({
    teamName: new TeamName('Team Name'),
    teamMembers: [],
  })

  // Creating a Pair instance
  const pair = Pair.create({
    teamId: team.id,
    pairName: 'Pair Name',
    pairMembers: [],
  })

  beforeEach(() => {
    service = new AssignPairService(mockPairRepository)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should assign a participant to a pair in a team', async () => {
    // Setting up mock repository to return the mock pair when fetchByTeamId is called
    jest
      .spyOn(mockPairRepository, 'fetchByTeamId')
      .mockResolvedValueOnce([pair])

    await service.assign(participant, team)

    // Verifying that fetchByTeamId is called with correct team id
    expect(mockPairRepository.fetchByTeamId).toHaveBeenCalledWith(team.id)

    // Verifying that save method is called
    expect(mockPairRepository.save).toHaveBeenCalled()

    // Verifying that save method is called with correct data
    expect(mockPairRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(String),
        teamId: expect.any(String),
        pairName: expect.any(Object),
        pairMembers: expect.arrayContaining([expect.any(PairMember)]),
      }),
    )
  })
})

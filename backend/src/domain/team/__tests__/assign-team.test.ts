import { Participant } from 'src/domain/participant/participant'
import { AssignTeamService } from '../assign-team.service'
import { ITeamRepository } from '../team.repository'
import { Team } from '../team'
import { createMockRepository } from '@testUtil/team.factory'
import { createMockParticipant } from '@testUtil/participant.factory'

describe('AssignTeamService', () => {
  let service: AssignTeamService
  let mockRepo: ITeamRepository
  let mockParticipant: Participant

  beforeEach(() => {
    mockRepo = createMockRepository()
    mockParticipant = createMockParticipant()
    service = new AssignTeamService(mockRepo)
  })

  it('assigns participant to an inactive team if any exists', async () => {
    const mockInactiveTeam = ({
      id: 'team1',
      isInactive: true,
      assignTeamMember: jest.fn().mockReturnValue({
        id: 'team1',
        teamMembersCount: 1,
      }),
      teamMembersCount: 0,
    } as unknown) as Team
    const mockActiveTeam = ({
      id: 'team2',
      isInactive: false,
      assignTeamMember: jest.fn().mockReturnValue({
        id: 'team2',
        teamMembersCount: 1,
      }),
      teamMembersCount: 0,
    } as unknown) as Team

    // Mock repository fetchAll method
    ;(mockRepo.fetchAll as jest.Mock).mockResolvedValue([
      mockInactiveTeam,
      mockActiveTeam,
    ])

    await service.assign(mockParticipant)

    // Assert that inactive team was updated
    expect(mockInactiveTeam.assignTeamMember).toHaveBeenCalled()
    expect(mockRepo.save).toHaveBeenCalled()
  })

  it('assigns participant to an active team if no inactive teams exist', async () => {
    // Set up mock teams
    const mockActiveTeam = ({
      id: 'team1',
      isInactive: false,
      assignTeamMember: jest.fn().mockReturnValue({
        id: 'team1',
        teamMembersCount: 1,
      }),
      teamMembersCount: 0,
    } as unknown) as Team

    // Mock repository fetchAll method
    ;(mockRepo.fetchAll as jest.Mock).mockResolvedValue([mockActiveTeam])

    await service.assign(mockParticipant)

    // Assert that active team was updated
    expect(mockActiveTeam.assignTeamMember).toHaveBeenCalled()
    expect(mockRepo.save).toHaveBeenCalled()
  })
})

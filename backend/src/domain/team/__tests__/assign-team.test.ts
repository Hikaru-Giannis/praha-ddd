import { Participant } from 'src/domain/participant/participant'
import { AssignTeamService } from '../assign-team.service'
import { createActiveTeam, createInactiveTeam } from '@testUtil/team.factory'
import { Test, TestingModule } from '@nestjs/testing'
import { tokens } from 'src/tokens'
import { TeamInMemoryRepository } from 'src/infra/db/repository/team/team.in-memory.repository'

describe('AssignTeamService', () => {
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
          provide: tokens.ITeamRepository,
          useClass: TeamInMemoryRepository,
        },
        {
          provide: tokens.AssignTeamService,
          useClass: AssignTeamService,
        },
      ],
    }).compile()
  })

  it('活性化チームと非活性化のチームが存在する場合、非活性化チームに参加者が割り当てられる', async () => {
    // arrange
    const teamInMemoryRepository = testApp.get(tokens.ITeamRepository)
    const inactiveTeam = createInactiveTeam()
    const activeTeam = createActiveTeam()
    teamInMemoryRepository.items = [inactiveTeam, activeTeam]

    // act
    const assignTeamService = testApp.get(tokens.AssignTeamService)
    await assignTeamService.assign(participant)

    // assert
    const team = await teamInMemoryRepository.findByParticipantId(
      participant.id,
    )
    expect(team.isInactive).toBeTruthy()
  })

  it('非活性化チームが存在しない場合、活性化チームに参加者が割り当てられる', async () => {
    // arrange
    const teamInMemoryRepository = testApp.get(tokens.ITeamRepository)
    const activeTeam = createActiveTeam()
    teamInMemoryRepository.items = [activeTeam]

    // act
    const assignTeamService = testApp.get(tokens.AssignTeamService)
    await assignTeamService.assign(participant)

    // assert
    const team = await teamInMemoryRepository.findByParticipantId(
      participant.id,
    )
    expect(team.isActive).toBeTruthy()
  })

  it('非活性化チームのみの場合、非活性化チームで一番チームメンバーが少ないチームに参加者が割り当てられる', async () => {
    // arrange
    const teamInMemoryRepository = testApp.get(tokens.ITeamRepository)
    const inactiveTeam1 = createInactiveTeam(1)
    const inactiveTeam2 = createInactiveTeam(2)
    teamInMemoryRepository.items = [inactiveTeam1, inactiveTeam2]

    // act
    const assignTeamService = testApp.get(tokens.AssignTeamService)
    await assignTeamService.assign(participant)

    // assert
    const team = await teamInMemoryRepository.findByParticipantId(
      participant.id,
    )
    expect(inactiveTeam1.id.equals(team.id)).toBeTruthy()
  })

  it('活性化チームのみの場合、活性化チームかつ一番チームメンバーが少ないチームに参加者が割り当てられる', async () => {
    // arrange
    const teamInMemoryRepository = testApp.get(tokens.ITeamRepository)

    const activeTeam1 = createActiveTeam(3)
    const activeTeam2 = createActiveTeam(4)
    teamInMemoryRepository.items = [activeTeam1, activeTeam2]

    // act
    const assignTeamService = testApp.get(tokens.AssignTeamService)
    await assignTeamService.assign(participant)

    // assert
    const team = await teamInMemoryRepository.findByParticipantId(
      participant.id,
    )
    expect(activeTeam1.id.equals(team.id)).toBeTruthy()
  })

  it('非活性化チームと活性化チームが存在しない場合、例外エラーを返す', async () => {
    // arrange
    const teamInMemoryRepository = testApp.get(tokens.ITeamRepository)
    teamInMemoryRepository.items = []

    // act
    const assignTeamService = testApp.get(tokens.AssignTeamService)

    // assert
    await expect(assignTeamService.assign(participant)).rejects.toThrowError()
  })
})

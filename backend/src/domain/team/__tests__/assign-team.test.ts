import { Participant } from 'src/domain/participant/participant'
import { AssignTeamService } from '../assign-team.service'
import { ITeamRepository } from '../team.repository'
import { createActiveTeam, createInactiveTeam } from '@testUtil/team.factory'

describe('AssignTeamService', () => {
  it('活性化チームと非活性化のチームが存在する場合、非活性化チームに参加者が割り当てられる', async () => {
    const inactiveTeam = createInactiveTeam()
    const activeTeam = createActiveTeam()
    const participant = Participant.create({
      name: 'test test',
      email: 'test@example.com',
    })

    const teamRepository = ({
      fetchAll: jest.fn().mockResolvedValueOnce([inactiveTeam, activeTeam]),
      save: jest.fn(),
    } as unknown) as ITeamRepository

    const assignTeamService = new AssignTeamService(teamRepository)

    const team = await assignTeamService.assign(participant)
    expect(team?.isInactive).toBeTruthy()
  })

  it('非活性化チームが存在しない場合、活性化チームに参加者が割り当てられる', async () => {
    const activeTeam = createActiveTeam()
    const participant = Participant.create({
      name: 'test test',
      email: 'test@example.com',
    })

    const teamRepository = ({
      fetchAll: jest.fn().mockResolvedValueOnce([activeTeam]),
      save: jest.fn(),
    } as unknown) as ITeamRepository

    const assignTeamService = new AssignTeamService(teamRepository)

    const team = await assignTeamService.assign(participant)
    expect(team?.isActive).toBeTruthy()
  })

  it('非活性化チームのみの場合、非活性化チームで一番チームメンバーが少ないチームに参加者が割り当てられる', async () => {
    const inactiveTeam1 = createInactiveTeam(0)
    const inactiveTeam2 = createInactiveTeam(1)
    const inactiveTeam3 = createInactiveTeam(2)
    const activeTeam = createActiveTeam()
    const participant = Participant.create({
      name: 'test test',
      email: 'test@example.com',
    })

    const teamRepository = ({
      fetchAll: jest
        .fn()
        .mockResolvedValueOnce([
          inactiveTeam1,
          inactiveTeam2,
          inactiveTeam3,
          ,
          activeTeam,
        ]),
      save: jest.fn(),
    } as unknown) as ITeamRepository

    const assignTeamService = new AssignTeamService(teamRepository)

    const team = await assignTeamService.assign(participant)
    expect(team?.teamMembersCount).toBe(1)
  })

  it('非活性化チームが存在しない場合、活性化チームかつ一番チームメンバーが少ないチームに参加者が割り当てられる', async () => {
    const activeTeam1 = createActiveTeam(3)
    const activeTeam2 = createActiveTeam(4)
    const activeTeam3 = createActiveTeam(5)
    const participant = Participant.create({
      name: 'test test',
      email: 'test@example.com',
    })

    const teamRepository = ({
      fetchAll: jest
        .fn()
        .mockResolvedValueOnce([activeTeam1, activeTeam2, activeTeam3]),
      save: jest.fn(),
    } as unknown) as ITeamRepository

    const assignTeamService = new AssignTeamService(teamRepository)

    const team = await assignTeamService.assign(participant)
    expect(team?.teamMembersCount).toBe(4)
  })

  it('非活性化チームと活性化チームが存在しない場合、例外エラーを返す', async () => {
    const participant = Participant.create({
      name: 'test test',
      email: 'test@example.com',
    })

    const teamRepository = ({
      fetchAll: jest.fn().mockResolvedValueOnce([]),
      save: jest.fn(),
    } as unknown) as ITeamRepository

    const assignTeamService = new AssignTeamService(teamRepository)
    await expect(assignTeamService.assign(participant)).rejects.toThrowError()
  })
})

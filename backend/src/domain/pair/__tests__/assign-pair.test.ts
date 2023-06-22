import { Participant } from 'src/domain/participant/participant'
import { AssignPairService } from '../assign-pair.service'
import { IPairRepository } from '../pair.repository'
import { createActiveTeam } from '@testUtil/team.factory'
import { createPair } from '@testUtil/pair.factory'

describe('AssignPairService', () => {
  it('参加者がペアに正常に割り当てられ、そのペアが返される', async () => {
    const participant = Participant.create({
      name: 'test test',
      email: 'test@example.com',
    })

    const pair = createPair(2)
    const team = createActiveTeam()

    const pairRepository = ({
      fetchByTeamId: jest.fn().mockResolvedValueOnce([pair]),
      save: jest.fn(),
    } as unknown) as IPairRepository

    const assignPairService = new AssignPairService(pairRepository)

    const assignedPairs = await assignPairService.assign(participant, team)
    expect(assignedPairs).toHaveLength(1)
    expect(assignedPairs[0]?.isFull).toBeTruthy()
    expect(assignedPairs[0]?.equals(pair)).toBeTruthy()
  })

  it('チームにペアが存在しない場合、エラーがスローされること', async () => {
    const participant = Participant.create({
      name: 'test test',
      email: 'test@example.com',
    })

    const team = createActiveTeam()

    const pairRepository = ({
      fetchByTeamId: jest.fn().mockResolvedValueOnce([]),
      save: jest.fn(),
    } as unknown) as IPairRepository

    const assignPairService = new AssignPairService(pairRepository)

    await expect(
      assignPairService.assign(participant, team),
    ).rejects.toThrowError()
  })

  it('選択されたペアが満員の場合、そのペアが分割され、新しいペアが作成されること。', async () => {
    const participant = Participant.create({
      name: 'test test',
      email: 'test@example.com',
    })

    const pair = createPair(3)
    const team = createActiveTeam()

    const pairRepository = ({
      fetchByTeamId: jest.fn().mockResolvedValueOnce([pair]),
      save: jest.fn(),
    } as unknown) as IPairRepository

    const assignPairService = new AssignPairService(pairRepository)

    const assignedPairs = await assignPairService.assign(participant, team)
    expect(assignedPairs).toHaveLength(2)
    expect(
      assignedPairs[0]?.equals(pair) || assignedPairs[1]?.equals(pair),
    ).toBeTruthy()
  })

  it('最新のペアが取得できない場合、エラーがスローされること', async () => {
    const participant = Participant.create({
      name: 'test test',
      email: 'test@example.com',
    })

    const team = createActiveTeam()

    const pairRepository = ({
      fetchByTeamId: jest.fn().mockResolvedValueOnce([null]),
      save: jest.fn(),
    } as unknown) as IPairRepository

    const assignPairService = new AssignPairService(pairRepository)

    await expect(
      assignPairService.assign(participant, team),
    ).rejects.toThrowError()
  })
})

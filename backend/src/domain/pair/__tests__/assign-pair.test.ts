import { Participant } from 'src/domain/participant/participant'
import { Pair } from '../pair'
import { AssignPairService } from '../assign-pair.service'
import { IPairRepository } from '../pair.repository'
import { createActiveTeam } from '@testUtil/team.factory'
import { createPair } from '@testUtil/pair.factory'

describe('AssignPairService', () => {
  it('ペアを割り当てる', async () => {
    const team = createActiveTeam(4)
    const participant = Participant.create({
      name: 'test test',
      email: 'test@example.com',
    })

    const pair1 = createPair(2)

    const pairRepository = ({
      fetchByTeamId: jest.fn().mockResolvedValueOnce([pair1]),
      save: jest.fn().mockImplementation((pair: Pair) => {
        return Promise.resolve(pair)
      }),
    } as unknown) as IPairRepository

    const assignPairService = new AssignPairService(pairRepository)
    await assignPairService.assign(participant, team)

    expect(pairRepository.save).toBeCalledTimes(1)
  })
})

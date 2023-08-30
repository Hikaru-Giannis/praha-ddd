import { Participant } from 'src/domain/participant/participant'
import { AssignPairService } from '../assign-pair.service'
import { createTeam } from '@testUtil/team.factory'
import { createPair } from '@testUtil/pair.factory'
import { Test, TestingModule } from '@nestjs/testing'
import { tokens } from 'src/tokens'
import { PairInMemoryRepository } from 'src/infra/db/repository/pair/pair.in-memory.repository'
import { TeamInMemoryRepository } from 'src/infra/db/repository/team/team.in-memory.repository'

describe('AssignPairService', () => {
  let testApp: TestingModule
  let participant: Participant

  beforeEach(async () => {
    // 参加者を作成
    participant = Participant.create({
      name: 'test test',
      email: 'test@example.com',
    })

    testApp = await Test.createTestingModule({
      providers: [
        {
          provide: tokens.IPairRepository,
          useClass: PairInMemoryRepository,
        },
        {
          provide: tokens.AssignPairService,
          useClass: AssignPairService,
        },
        {
          provide: tokens.ITeamRepository,
          useClass: TeamInMemoryRepository,
        },
      ],
    }).compile()
  })

  it('参加者がペアに正常に割り当てられ、そのペアが返される', async () => {
    // arrange
    const team = createTeam(participant.id)
    const teamRepository = testApp.get(tokens.ITeamRepository)
    teamRepository.items = [team]

    const pairRepository = testApp.get(tokens.IPairRepository)
    const pair = createPair(2, team.id)
    pairRepository.items = [pair]

    // act
    const assignPairService = testApp.get(tokens.AssignPairService)
    await assignPairService.assign(participant)

    // assert
    const assignedPair = await pairRepository.findById(pair.id)
    expect(assignedPair.id.equals(pair.id)).toBeTruthy()
  })

  it('チームにペアが存在しない場合、エラーがスローされること', async () => {
    // arrange
    const team = createTeam(participant.id)
    const teamRepository = testApp.get(tokens.ITeamRepository)
    teamRepository.items = [team]

    // act
    const assignPairService = testApp.get(tokens.AssignPairService)

    // assert
    await expect(assignPairService.assign(participant)).rejects.toThrowError()
  })

  it('選択されたペアが満員の場合、そのペアが分割され、新しいペアが作成されること。', async () => {
    // arrange
    const team = createTeam(participant.id)
    const teamRepository = testApp.get(tokens.ITeamRepository)
    teamRepository.items = [team]

    const pairRepository = testApp.get(tokens.IPairRepository)
    const pair = createPair(3, team.id)
    pairRepository.items = [pair]

    // act
    const assignPairService = testApp.get(tokens.AssignPairService)
    await assignPairService.assign(participant)

    // assert
    const pairs = await pairRepository.findManyByTeamId(team.id)
    expect(pairs.length).toBe(2)
    expect(pairs[0].pairMembersCount).toBe(2)
    expect(pairs[1].pairMembersCount).toBe(2)
  })
})

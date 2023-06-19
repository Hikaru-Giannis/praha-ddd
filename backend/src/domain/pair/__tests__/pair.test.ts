import { Pair } from '../pair'
import { PairName } from '../PairName'
import { createActiveTeam } from '@testUtil/team.factory'

describe('Pair', () => {
  it('ペアを作成する', () => {
    const team = createActiveTeam(4)
    const pair = Pair.create({
      teamId: team.id,
      pairMembers: [],
      latestPair: undefined,
    })

    expect(pair).toEqual({
      id: expect.any(String),
      teamId: team.id,
      pairName: PairName.first,
      pairMembers: [],
    })
  })
})

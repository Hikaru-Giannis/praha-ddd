import { ParticipantId } from 'src/domain/participant/ParticipantId'
import { Pair } from '../pair'
import { PairMember } from '../pair-member'
import { PairName } from '../PairName'
import { ulid } from 'ulid'

describe('Pair', () => {
  it('作成', () => {
    const pairMember = PairMember.create({
      participantId: new ParticipantId(ulid()),
    })

    const createProps = {
      teamId: 'teamId',
      pairMembers: [pairMember],
      latestPair: undefined,
    }

    const pair = Pair.create(createProps)
    expect(pair).toBeDefined()
    expect(pair.getAllProperties).toEqual({
      id: expect.any(String),
      teamId: 'teamId',
      pairName: PairName.first,
      pairMembers: [pairMember.getAllProperties],
    })
  })
})

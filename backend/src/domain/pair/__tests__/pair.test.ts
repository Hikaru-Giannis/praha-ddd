import { ParticipantId } from 'src/domain/participant/ParticipantId'
import { Pair } from '../pair'
import { PairMember } from '../pair-member'
import { PairName } from '../PairName'
import { ulid } from 'ulid'
import { TeamId } from 'src/domain/team/TeamId'

describe('Pair', () => {
  it('作成', () => {
    const pairMember = PairMember.create({
      participantId: new ParticipantId(ulid()),
    })

    const teamId = new TeamId(ulid())

    const createProps = {
      teamId: teamId,
      pairMembers: [pairMember],
      latestPair: undefined,
    }

    const pair = Pair.create(createProps)
    expect(pair).toBeDefined()
    expect(pair.getAllProperties).toEqual({
      id: expect.any(String),
      teamId: teamId,
      pairName: PairName.first,
      pairMembers: [pairMember.getAllProperties],
    })
  })
})

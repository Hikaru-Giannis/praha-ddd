import { ParticipantId } from 'src/domain/participant/ParticipantId'
import { Pair } from '../pair'
import { PairMember } from '../pair-member'
import { PairName } from '../PairName'
import { ulid } from 'ulid'
import { TeamId } from 'src/domain/team/TeamId'
import { Participant } from 'src/domain/participant/participant'

describe('Pair', () => {
  it('正常に作成できるか', () => {
    const pair = Pair.create({
      teamId: new TeamId(ulid()),
      pairMembers: [
        PairMember.create({
          participantId: new ParticipantId(ulid()),
        }),
        PairMember.create({
          participantId: new ParticipantId(ulid()),
        }),
      ],
      latestPair: undefined,
    })

    expect(pair).toBeInstanceOf(Pair)
    expect(pair.pairMembersCount).toBe(2)
  })

  it('正常に再構築できるか', () => {
    const pair = Pair.reconstruct({
      id: ulid(),
      teamId: ulid(),
      pairName: PairName.first,
      pairMembers: [
        PairMember.create({
          participantId: new ParticipantId(ulid()),
        }),
        PairMember.create({
          participantId: new ParticipantId(ulid()),
        }),
      ],
    })

    expect(pair).toBeInstanceOf(Pair)
    expect(pair.pairMembersCount).toBe(2)
  })

  it('正常に比較できるか', () => {
    const pairId = ulid()
    const pair1 = Pair.reconstruct({
      id: pairId,
      teamId: ulid(),
      pairName: PairName.first,
      pairMembers: [
        PairMember.create({
          participantId: new ParticipantId(ulid()),
        }),
        PairMember.create({
          participantId: new ParticipantId(ulid()),
        }),
      ],
    })

    const pair2 = Pair.reconstruct({
      id: pairId,
      teamId: ulid(),
      pairName: PairName.first,
      pairMembers: [
        PairMember.create({
          participantId: new ParticipantId(ulid()),
        }),
        PairMember.create({
          participantId: new ParticipantId(ulid()),
        }),
      ],
    })

    expect(pair1.equals(pair2)).toBe(true)
  })

  it('全てのプロパティを取得できるか', () => {
    const pairId = ulid()
    const pair = Pair.reconstruct({
      id: pairId,
      teamId: ulid(),
      pairName: PairName.first,
      pairMembers: [
        PairMember.create({
          participantId: new ParticipantId(ulid()),
        }),
        PairMember.create({
          participantId: new ParticipantId(ulid()),
        }),
      ],
    })

    const allProperties = pair.getAllProperties

    expect(allProperties.id).toBe(pairId)
    expect(allProperties.teamId).toBe(pair.teamId)
    expect(allProperties.pairName.equals(PairName.first)).toBe(true)
    expect(allProperties.pairMembers.length).toBe(2)
  })

  it('分割する際、ペアが満たされていない場合、エラーを投げるか', () => {
    const teamId = new TeamId(ulid())
    const pairMembers = [
      PairMember.create({
        participantId: new ParticipantId(ulid()),
      }),
      PairMember.create({
        participantId: new ParticipantId(ulid()),
      }),
      PairMember.create({
        participantId: new ParticipantId(ulid()),
      }),
    ]
    const latestPair = Pair.create({
      teamId,
      pairMembers,
      latestPair: undefined,
    })

    const pairMember = PairMember.create({
      participantId: new ParticipantId(ulid()),
    })
    const notFullPair = Pair.create({
      teamId,
      pairMembers: [
        PairMember.create({
          participantId: new ParticipantId(ulid()),
        }),
      ],
      latestPair,
    })

    expect(() => notFullPair.dividePair(pairMember)).toThrow(
      'ペアメンバーが満たされていません。',
    )
  })

  it('ペアメンバーが満たされている状態で、正常にペアを分割するか', () => {
    const teamId = new TeamId(ulid())
    const pairMembers = [
      PairMember.create({
        participantId: new ParticipantId(ulid()),
      }),
      PairMember.create({
        participantId: new ParticipantId(ulid()),
      }),
      PairMember.create({
        participantId: new ParticipantId(ulid()),
      }),
    ]
    const latestPair = Pair.create({
      teamId,
      pairMembers,
      latestPair: undefined,
    })

    const pairMember = PairMember.create({
      participantId: new ParticipantId(ulid()),
    })
    const [dividedPair, newPairMembers] = latestPair.dividePair(pairMember)

    expect(dividedPair.pairMembersCount).toBe(2)
    expect(newPairMembers.length).toBe(2)
  })

  it('ペアメンバーが満たされている状態で、ペアメンバーを割り当てるとエラーを投げるか', () => {
    const teamId = new TeamId(ulid())
    const pairMembers = [
      PairMember.create({
        participantId: new ParticipantId(ulid()),
      }),
      PairMember.create({
        participantId: new ParticipantId(ulid()),
      }),
      PairMember.create({
        participantId: new ParticipantId(ulid()),
      }),
    ]
    const latestPair = Pair.create({
      teamId,
      pairMembers,
      latestPair: undefined,
    })

    const pairMember = PairMember.create({
      participantId: new ParticipantId(ulid()),
    })

    expect(() => latestPair.assignPairMember(pairMember)).toThrow(
      'ペアメンバーが満たされています。',
    )
  })

  it('ペアメンバーが満たされていない場合、正常にペアメンバーを割り当てるか', () => {
    const teamId = new TeamId(ulid())
    const pairMembers = [
      PairMember.create({
        participantId: new ParticipantId(ulid()),
      }),
      PairMember.create({
        participantId: new ParticipantId(ulid()),
      }),
    ]
    const latestPair = Pair.create({
      teamId,
      pairMembers,
      latestPair: undefined,
    })

    const pairMember = PairMember.create({
      participantId: new ParticipantId(ulid()),
    })

    const assignedPair = latestPair.assignPairMember(pairMember)

    expect(assignedPair.pairMembersCount).toBe(3)
  })

  it('チーム変更ができているか', () => {
    const teamId = new TeamId(ulid())
    const pairMembers = [
      PairMember.create({
        participantId: new ParticipantId(ulid()),
      }),
      PairMember.create({
        participantId: new ParticipantId(ulid()),
      }),
    ]
    const latestPair = Pair.create({
      teamId,
      pairMembers,
      latestPair: undefined,
    })

    const newTeamId = new TeamId(ulid())
    const changedPair = latestPair.changeTeam(newTeamId)

    expect(changedPair.teamId.equals(newTeamId)).toBe(true)
  })

  it('特定のペアメンバーが属しているか', () => {
    const participant1 = Participant.create({
      name: 'test1',
      email: 'test1@example.com',
    })
    const participant2 = Participant.create({
      name: 'test2',
      email: 'test2@example.com',
    })
    const teamId = new TeamId(ulid())
    const pairMembers = [
      PairMember.create({
        participantId: participant2.id,
      }),
      PairMember.create({
        participantId: new ParticipantId(ulid()),
      }),
    ]
    const latestPair = Pair.create({
      teamId,
      pairMembers,
      latestPair: undefined,
    })

    expect(latestPair.hasPairMember(participant1.id)).toBe(false)
    expect(latestPair.hasPairMember(participant2.id)).toBe(true)
  })

  it('ペアメンバーを移動できるか', () => {
    const participant1 = Participant.create({
      name: 'test1',
      email: 'test1@example.com',
    })

    const teamId = new TeamId(ulid())
    const pairMembers = [
      PairMember.create({
        participantId: participant1.id,
      }),
      PairMember.create({
        participantId: new ParticipantId(ulid()),
      }),
      PairMember.create({
        participantId: new ParticipantId(ulid()),
      }),
    ]
    const latestPair = Pair.create({
      teamId,
      pairMembers,
      latestPair: undefined,
    })

    const [movedPair, movePairMember] = latestPair.movePairMember(
      participant1.id,
    )

    expect(movedPair.pairMembersCount).toBe(2)
    expect(movePairMember.equals(participant1.id)).toBe(true)
  })
})

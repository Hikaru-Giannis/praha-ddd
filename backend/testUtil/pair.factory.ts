import { Pair } from 'src/domain/pair/pair'
import { PairMember } from 'src/domain/pair/pair-member'
import { ParticipantId } from 'src/domain/participant/ParticipantId'
import { TeamId } from 'src/domain/team/TeamId'
import { ulid } from 'ulid'

/**
 * ペアメンバーの作成
 */
export const createPairMembers = (memberCount: 2 | 3): PairMember[] => {
  return Array.from({ length: memberCount }, (_, i) => {
    return PairMember.create({
      participantId: new ParticipantId(ulid()),
    })
  })
}

/**
 * ペアを作成
 */
export const createPair = (memberCount: 2 | 3, teamId?: TeamId): Pair => {
  return Pair.create({
    teamId: teamId || new TeamId(ulid()),
    pairMembers: createPairMembers(memberCount),
    latestPair: undefined,
  })
}

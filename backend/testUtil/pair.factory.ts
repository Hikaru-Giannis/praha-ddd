import { Pair } from 'src/domain/pair/pair'
import { PairMember } from 'src/domain/pair/pair-member'

/**
 * ペアメンバーの作成
 */
export const createPairMembers = (memberCount: 2 | 3): PairMember[] => {
  return Array.from({ length: memberCount }, (_, i) => {
    return PairMember.create({
      participantId: `0${i + 1}`,
    })
  })
}

/**
 * ペアを作成
 */
export const createPair = (memberCount: 2 | 3): Pair => {
  return Pair.create({
    teamId: '1',
    pairMembers: createPairMembers(memberCount),
    latestPair: undefined,
  })
}

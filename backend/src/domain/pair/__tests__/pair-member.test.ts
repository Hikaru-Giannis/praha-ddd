import { ParticipantId } from 'src/domain/participant/ParticipantId'
import { createRandomIdString } from 'src/util/random'
import { PairMember } from '../pair-member'

describe('PairMember', () => {
  const randomParticipantId = createRandomIdString()
  const participantId = new ParticipantId(randomParticipantId)

  test('正常に生成できるか', () => {
    const pairMember = PairMember.create({ participantId })
    expect(pairMember.getAllProperties.participantId).toBe(randomParticipantId)
  })

  test('正常に再構築できるか', () => {
    const pairMember = PairMember.reconstruct({
      id: createRandomIdString(),
      participantId: participantId.value,
    })
    expect(pairMember.getAllProperties.participantId).toBe(randomParticipantId)
  })

  test('同じ参加者の場合Trueを返すか', () => {
    const pairMember = PairMember.create({ participantId })
    expect(pairMember.equals(participantId)).toBe(true)
  })

  test('違う参加者の場合Falseを返すか', () => {
    const pairMember = PairMember.create({ participantId })
    const otherParticipantId = new ParticipantId(createRandomIdString())
    expect(pairMember.equals(otherParticipantId)).toBe(false)
  })
})

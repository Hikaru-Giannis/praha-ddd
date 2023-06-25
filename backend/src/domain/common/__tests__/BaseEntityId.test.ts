import { ParticipantId } from 'src/domain/participant/ParticipantId'

describe('BaseEntityId', () => {
  describe('ParticipantId', () => {
    it('正しくIDが作成されるか', () => {
      const id = '0123456789ABCDEFGHJKMNPQRS'
      const participantId = new ParticipantId(id)
      expect(participantId.value).toBe(id)
    })

    it('以上なID値の場合、例外を返すか', () => {
      const id = 'invalid_ulid'
      expect(() => new ParticipantId(id)).toThrowError(
        'Value is not a valid UlId',
      )
    })

    it('同じID値の場合、Trueを返すか', () => {
      const id = '0123456789ABCDEFGHJKMNPQRS'
      const participantId1 = new ParticipantId(id)
      const participantId2 = new ParticipantId(id)
      expect(participantId1.equals(participantId2)).toBe(true)
    })
  })
})

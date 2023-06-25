import { PARTICIPANT_STATUS, ParticipantStatus } from '../ParticipantStatus'

describe('ParticipantStatus', () => {
  describe('participating', () => {
    it('参加中状態を正しく返すか', () => {
      const status = ParticipantStatus.participating()
      expect(status.value).toEqual(PARTICIPANT_STATUS.PARTICIPATING)
    })
  })

  describe('adjourning', () => {
    it('休会中状態を正しく返すか', () => {
      const status = ParticipantStatus.adjourning()
      expect(status.value).toEqual(PARTICIPANT_STATUS.ADJOURNING)
    })
  })

  describe('withdrawn', () => {
    it('退会済み状態を正しく返すか', () => {
      const status = ParticipantStatus.withdrawn()
      expect(status.value).toEqual(PARTICIPANT_STATUS.WITHDRAWN)
    })
  })

  describe('isParticipating', () => {
    it('参加中状態の場合、Trueを返すか', () => {
      const status = ParticipantStatus.participating()
      expect(status.isParticipating).toEqual(true)
    })

    it('参加中状態以外の場合、Falseを返すか', () => {
      const status = ParticipantStatus.adjourning()
      expect(status.isParticipating).toEqual(false)
    })
  })

  describe('isAdjourning', () => {
    it('休会中状態の場合、Trueを返すか', () => {
      const status = ParticipantStatus.adjourning()
      expect(status.isAdjourning).toEqual(true)
    })

    it('休会中状態以外の場合、Falseを返すか', () => {
      const status = ParticipantStatus.participating()
      expect(status.isAdjourning).toEqual(false)
    })
  })

  describe('isWithdrawn', () => {
    it('退会済み状態の場合、Trueを返すか', () => {
      const status = ParticipantStatus.withdrawn()
      expect(status.isWithdrawn).toEqual(true)
    })

    it('退会済み状態以外の場合、Falseを返すか', () => {
      const status = ParticipantStatus.participating()
      expect(status.isWithdrawn).toEqual(false)
    })
  })
})

import { DomainValidationException } from 'src/domain/error/domain-validation.exception'
import { ParticipantName } from '../ParticipantName'

describe('ParticipantName', () => {
  it('正しい名前で ParticipantName が作成されるか', () => {
    const name = 'John Doe'
    const participantName = new ParticipantName(name)
    expect(participantName.value).toBe(name)
  })

  it('短すぎる名前の場合にエラーが投げられるか', () => {
    const name = ''
    expect(() => new ParticipantName(name)).toThrow(DomainValidationException)
  })

  it('長すぎる名前の場合にエラーが投げられるか', () => {
    const name = new Array(257).join('a')
    expect(() => new ParticipantName(name)).toThrow(DomainValidationException)
  })

  it('同じ値を持つ参加者名が等しいと判断されるか', () => {
    const name = 'John Doe'
    const participantName1 = new ParticipantName(name)
    const participantName2 = new ParticipantName(name)
    expect(participantName1.equals(participantName2)).toBe(true)
  })

  it('異なる値を持つ参加者名が等しくないと判断されるか', () => {
    const name1 = 'John Doe'
    const name2 = 'Jane Doe'
    const participantName1 = new ParticipantName(name1)
    const participantName2 = new ParticipantName(name2)
    expect(participantName1.equals(participantName2)).toBe(false)
  })
})

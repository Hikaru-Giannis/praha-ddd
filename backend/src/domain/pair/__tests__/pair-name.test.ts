import { DomainValidationError } from 'src/domain/error/domain-validation.error'
import { PairName } from '../PairName'

describe('PairName', () => {
  test('正常に生成できるか', () => {
    const pairName = new PairName('A')
    expect(pairName.value).toBe('A')
  })

  test('英字ではない場合、エラーを投げるか', () => {
    expect(() => new PairName('1')).toThrow(DomainValidationError)
  })

  test('1文字以上の英字の場合、エラーを投げるか', () => {
    expect(() => new PairName('AB')).toThrow(DomainValidationError)
  })

  test('次の英字のペア名を返すか', () => {
    const pairName = new PairName('A')
    const nextPairName = pairName.next
    expect(nextPairName.value).toBe('B')
  })

  test('最後のペア名だった場合、エラーを投げるか', () => {
    const pairName = new PairName('Z')
    expect(() => pairName.next).toThrow(DomainValidationError)
  })

  test('同じペア名の比較でTrueを返すか', () => {
    const pairName1 = new PairName('A')
    const pairName2 = new PairName('A')
    expect(pairName1.equals(pairName2)).toBe(true)
  })

  test('違うペア名でFalseを返すか', () => {
    const pairName1 = new PairName('A')
    const pairName2 = new PairName('B')
    expect(pairName1.equals(pairName2)).toBe(false)
  })

  test('最初のペア名の場合、Aを返すか', () => {
    const pairName = PairName.first
    expect(pairName.value).toBe('A')
  })
})

import { createRandomIdString } from 'src/util/random'
import { Pair } from '../pair'
import { PairName } from '../PairName'

describe('Pair', () => {
  it('名前がアルファベットでない場合、エラーを出力する', () => {
    expect(() =>
      Pair.create({
        teamId: createRandomIdString(),
        pairName: new PairName('123'),
        pairMembers: [],
      }),
    ).toThrowError(new Error('名前は英字のみです'))
  })

  it('名前が1文字以上の場合、エラーを出力', () => {
    expect(() =>
      Pair.create({
        teamId: createRandomIdString(),
        pairName: new PairName('ab'),
        pairMembers: [],
      }),
    ).toThrowError(new Error('名前は1文字です'))
  })

  it('名前がアルファベットで1文字以内の場合、新しいPairを作成', () => {
    const pair = Pair.create({
      teamId: createRandomIdString(),
      pairName: new PairName('a'),
      pairMembers: [],
    })

    expect(pair).toBeInstanceOf(Pair)
  })
})

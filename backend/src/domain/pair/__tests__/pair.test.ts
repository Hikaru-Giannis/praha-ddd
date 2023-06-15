import { createRandomIdString } from 'src/util/random'
import { Pair } from '../pair'

describe('Pair', () => {
  it('should throw an error when the name is not an alphabet character', () => {
    expect(() =>
      Pair.create({
        teamId: createRandomIdString(),
        pairName: '123',
      }),
    ).toThrowError(new Error('名前は英字のみです'))
  })

  it('should throw an error when the name is more than 1 character', () => {
    expect(() =>
      Pair.create({
        teamId: createRandomIdString(),
        pairName: 'ab',
      }),
    ).toThrowError(new Error('名前は1文字です'))
  })

  it('should create a new Pair when the name is an alphabet character and not more than 1 character', () => {
    const pair = Pair.create({
      teamId: createRandomIdString(),
      pairName: 'a',
    })

    expect(pair).toBeInstanceOf(Pair)
  })
})

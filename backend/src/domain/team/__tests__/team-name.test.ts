import { DomainValidationError } from 'src/domain/error/domain-validation.error'
import { TeamName } from '../TeamName'

describe('TeamName', () => {
  it('3文字以下の数字で正常に作成できるか', () => {
    const teamName = new TeamName('123')
    expect(teamName.value).toBe('123')
  })

  it('数字以外が含まれるとエラーを投げるか', () => {
    expect(() => {
      new TeamName('123abc')
    }).toThrow(DomainValidationError)
  })

  it('3文字以上の数字だとエラーを投げるか', () => {
    expect(() => {
      new TeamName('1234')
    }).toThrow(DomainValidationError)
  })

  it('正しい比較ができているか', () => {
    const teamName1 = new TeamName('123')
    const teamName2 = new TeamName('123')
    const teamName3 = new TeamName('321')

    expect(teamName1.equals(teamName2)).toBe(true)
    expect(teamName1.equals(teamName3)).toBe(false)
  })
})

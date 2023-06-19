import { createRandomIdString } from 'src/util/random'
import { Team } from '../team'
import { TeamMember } from '../team-member'
import { TeamName } from '../TeamName'

describe('Team', () => {
  it('チーム名が数字でない場合、エラーを出力する', () => {
    expect(() =>
      Team.create({
        teamName: new TeamName('abc'),
        teamMembers: [],
      }),
    ).toThrowError(new Error('名前は数字のみです'))
  })

  it('チーム名が3文字以上の場合、エラーを出力する', () => {
    const team = Team.create({
      teamName: new TeamName('1234'),
      teamMembers: [],
    })
    expect(() =>
      team.assignTeamMember(
        TeamMember.create({
          participantId: createRandomIdString(),
        }),
      ),
    ).toThrowError(new Error('名前は3文字以下です'))
  })

  it('チーム名が数字で3文字以内の場合、新しいチームを作成する', () => {
    const team = Team.create({
      teamName: new TeamName('123'),
      teamMembers: [],
    })
    expect(team).toBeInstanceOf(Team)
  })
})

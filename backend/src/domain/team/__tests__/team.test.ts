import { createRandomIdString } from 'src/util/random'
import { Team } from '../team'
import { TeamMember } from '../team-member'

describe('Team', () => {
  it('should throw an error when the team name is not a number', () => {
    expect(() =>
      Team.create({
        teamName: 'abc',
        teamMembers: [],
      }),
    ).toThrowError(new Error('名前は数字のみです'))
  })

  it('should throw an error when the team name is more than 3 characters', () => {
    expect(() =>
      Team.create({
        teamName: '1234',
        teamMembers: [],
      }),
    ).toThrowError(new Error('名前は3文字以下です'))
  })

  it('should create a new Team when the team name is a number and not more than 3 characters', () => {
    const team = Team.create({
      teamName: '123',
      teamMembers: [
        TeamMember.create({
          id: createRandomIdString(),
          teamId: createRandomIdString(),
          participantId: createRandomIdString(),
        }),
      ],
    })

    expect(team).toBeInstanceOf(Team)
  })
})

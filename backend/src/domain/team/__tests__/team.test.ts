import { createRandomIdString } from 'src/util/random'
import { Team } from '../team'
import { TeamMember } from '../team-member'

describe('Team', () => {
  it('should throw an error when the name is not a number', () => {
    expect(() =>
      Team.create({
        id: '1',
        name: 'abc',
        status: 'active',
        teamMembers: [],
      }),
    ).toThrowError(new Error('名前は数字のみです'))
  })

  it('should throw an error when the name is more than 3 characters', () => {
    expect(() =>
      Team.create({
        id: createRandomIdString(),
        name: '1234',
        status: 'active',
        teamMembers: [],
      }),
    ).toThrowError(new Error('名前は3文字以下です'))
  })

  it('should create a new Team when the name is a number and not more than 3 characters', () => {
    const team = Team.create({
      id: createRandomIdString(),
      name: '123',
      status: 'active',
      teamMembers: [
        TeamMember.create({
          teamId: createRandomIdString(),
          participantId: createRandomIdString(),
        }),
      ],
    })

    expect(team).toBeInstanceOf(Team)
  })
})

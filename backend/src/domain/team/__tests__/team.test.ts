import { createRandomIdString } from 'src/util/random'
import { TeamName } from '../TeamName'
import { TeamMember } from '../team-member'
import { ParticipantId } from 'src/domain/participant/ParticipantId'
import { Team } from '../team'
import { TeamStatusType } from '../TeamStatus'
import { Pair } from 'src/domain/pair/pair'
import { PairMember } from 'src/domain/pair/pair-member'

describe('Team', () => {
  it('3人以上のチームメンバーで活性化のチーム生成できるか', () => {
    const teamName = new TeamName('123')
    const teamMembers = [
      TeamMember.create({
        participantId: new ParticipantId(createRandomIdString()),
      }),
      TeamMember.create({
        participantId: new ParticipantId(createRandomIdString()),
      }),
      TeamMember.create({
        participantId: new ParticipantId(createRandomIdString()),
      }),
    ]

    const team = Team.create({ teamName, teamMembers })

    expect(team).toBeInstanceOf(Team)
    expect(team.teamMembersCount).toBe(3)
    expect(team.isActive).toBe(true)
  })

  it('3人以下のチームメンバーで非活性のチームを生成できるか', () => {
    const teamName = new TeamName('123')
    const teamMembers = [
      TeamMember.create({
        participantId: new ParticipantId(createRandomIdString()),
      }),
      TeamMember.create({
        participantId: new ParticipantId(createRandomIdString()),
      }),
    ]

    const team = Team.create({ teamName, teamMembers })

    expect(team).toBeInstanceOf(Team)
    expect(team.teamMembersCount).toBe(2)
    expect(team.isInactive).toBe(true)
  })

  it('チームを正しく再構築できるか', () => {
    const props = {
      id: createRandomIdString(),
      teamName: '1',
      status: 'inactive' as TeamStatusType,
      teamMembers: [
        TeamMember.create({
          participantId: new ParticipantId(createRandomIdString()),
        }),
        TeamMember.create({
          participantId: new ParticipantId(createRandomIdString()),
        }),
      ],
    }

    const team = Team.reconstruct(props)

    expect(team).toBeInstanceOf(Team)
    expect(team.teamMembersCount).toBe(2)
    expect(team.isInactive).toBe(true)
  })

  it('正常にチームメンバーを割り当てられるか', () => {
    const team = Team.create({
      teamName: new TeamName('1'),
      teamMembers: [
        TeamMember.create({
          participantId: new ParticipantId(createRandomIdString()),
        }),
        TeamMember.create({
          participantId: new ParticipantId(createRandomIdString()),
        }),
      ],
    })

    expect(team.isInactive).toBe(true)

    const newMember = TeamMember.create({
      participantId: new ParticipantId(createRandomIdString()),
    })
    const updatedTeam = team.assignTeamMembers([newMember])

    expect(updatedTeam.isActive).toBe(true)
    expect(updatedTeam.teamMembersCount).toBe(3)
  })

  it('全てのプロパティ値を返すか', () => {
    const teamName = new TeamName('1')
    const teamMembers = [
      TeamMember.create({
        participantId: new ParticipantId(createRandomIdString()),
      }),
      TeamMember.create({
        participantId: new ParticipantId(createRandomIdString()),
      }),
    ]
    const team = Team.create({ teamName, teamMembers })
    const properties = team.getAllProperties()
    expect(properties.teamName).toBe(teamName.value)
    expect(properties.status).toBe('inactive')
    expect(properties.teamMembers.length).toBe(2)
  })

  test('チーム移動ができるか', () => {
    const team = Team.create({
      teamName: new TeamName('1'),
      teamMembers: [
        TeamMember.create({
          participantId: new ParticipantId('01F8MECHZX3TBDSZ7STCF8BCRX'),
        }),
        TeamMember.create({
          participantId: new ParticipantId('01F8MECHZX3TBDSZ7STCF8BCRY'),
        }),
        TeamMember.create({
          participantId: new ParticipantId('01F8MECHZX3TBDSZ7STCF8BCRZ'),
        }),
      ],
    })

    const pair = Pair.create({
      teamId: team.id.value,
      pairMembers: [
        PairMember.create({
          participantId: new ParticipantId('01F8MECHZX3TBDSZ7STCF8BCRY'),
        }),
        PairMember.create({
          participantId: new ParticipantId('01F8MECHZX3TBDSZ7STCF8BCRZ'),
        }),
      ],
      latestPair: undefined,
    })

    const [updatedTeam, movedTeamMembers] = team.moveTeamMember(pair)

    expect(updatedTeam.teamMembersCount).toBe(1)
    expect(updatedTeam.isInactive).toBe(true)
    expect(movedTeamMembers.length).toBe(2)
  })
})

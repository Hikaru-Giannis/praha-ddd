import { ParticipantId } from 'src/domain/participant/ParticipantId'
import { TeamName } from 'src/domain/team/TeamName'
import { Team } from 'src/domain/team/team'
import { TeamMember } from 'src/domain/team/team-member'
import { ulid } from 'ulid'

/**
 * チームメンバーを作成
 */
export const createTeamMembers = (count = 3): TeamMember[] => {
  return Array.from({ length: count }, (_, i) => {
    // ulidを使う

    return TeamMember.create({
      participantId: new ParticipantId(ulid()),
    })
  })
}

/**
 * 活性化されたチームを作成
 */
export const createInactiveTeam = (memberCount: 0 | 1 | 2 = 1) => {
  const teamMembers = createTeamMembers(memberCount)
  return Team.create({
    teamName: new TeamName('1'),
    teamMembers: teamMembers,
  })
}

/**
 * 活性化されたチームを作成
 */
export const createActiveTeam = (memberCount: 3 | 4 | 5 | 6 = 3) => {
  const teamMembers = createTeamMembers(memberCount)
  return Team.create({
    teamName: new TeamName('2'),
    teamMembers: teamMembers,
  })
}

export const createTeam = (participantId: ParticipantId) => {
  const teamMembers = createTeamMembers(3)
  return Team.create({
    teamName: new TeamName('1'),
    teamMembers: [
      ...teamMembers,
      TeamMember.create({
        participantId: participantId,
      }),
    ],
  })
}

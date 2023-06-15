import { PrismaClient } from '@prisma/client'
import { ITeamRepository } from 'src/domain/team/team.repository'
import { Team } from 'src/domain/team/team'
import { TeamMember } from 'src/domain/team/team-member'

export class TeamRepository implements ITeamRepository {
  public constructor(private prismaClient: PrismaClient) {}

  public async fetchAll(): Promise<Team[]> {
    const teams = await this.prismaClient.team.findMany({
      include: {
        members: true,
      },
    })

    return teams.map((team) => {
      return Team.reconstruct({
        id: team.id,
        teamName: team.name,
        status: team.status,
        teamMembers: team.members.map((member) => {
          return TeamMember.reconstruct({
            id: member.id,
            teamId: member.team_id,
            participantId: member.participant_id,
          })
        }),
      })
    })
  }

  public async save(team: Team): Promise<void> {
    console.log(team)
  }
}

import { PrismaClient } from '@prisma/client'
import { ITeamRepository } from 'src/domain/team/team.repository'
import { Team } from 'src/domain/team/team'
import { TeamMember } from 'src/domain/team/team-member'
import { TeamName } from 'src/domain/team/TeamName'

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
        teamName: new TeamName(team.name),
        status: team.status,
        teamMembers: team.members.map((member) => {
          return TeamMember.reconstruct({
            id: member.id,
            participantId: member.participant_id,
          })
        }),
      })
    })
  }

  public async save(team: Team): Promise<void> {
    const allProperties = team.getAllProperties()
    await this.prismaClient.team.upsert({
      where: { id: team.id },
      update: {
        name: allProperties.teamName,
        status: allProperties.status,
      },
      create: {
        id: allProperties.id,
        name: allProperties.teamName,
        status: allProperties.status,
      },
    })

    await Promise.all(
      allProperties.teamMembers.map(async (teamMember) => {
        await this.prismaClient.teamMember.upsert({
          where: { id: teamMember.id },
          update: {
            team_id: team.id,
            participant_id: teamMember.participantId,
          },
          create: {
            id: teamMember.id,
            team_id: team.id,
            participant_id: teamMember.participantId,
          },
        })
      }),
    )
  }
}

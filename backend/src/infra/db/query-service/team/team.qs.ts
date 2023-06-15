import { PrismaClient } from '@prisma/client'
import { ITeamQS, TeamDTO } from 'src/app/team/query-service-interface/team.qs'

export class TeamQS implements ITeamQS {
  public constructor(private prismaClient: PrismaClient) {}

  public async fetchAll(): Promise<TeamDTO[]> {
    // チームメンバーと参加者を取得する
    const teams = await this.prismaClient.team.findMany({
      include: {
        members: {
          include: {
            participant: true,
          },
        },
      },
    })

    // チームメンバーと参加者を結合する
    const teamDTOs = teams.map((team) => {
      const teamMembers = team.members.map((member) => {
        return {
          id: member.participant.id,
          name: member.participant.name,
          email: member.participant.email,
        }
      })
      return {
        id: team.id,
        name: team.name,
        status: team.status,
        teamMembers,
      }
    })

    return teamDTOs
  }
}

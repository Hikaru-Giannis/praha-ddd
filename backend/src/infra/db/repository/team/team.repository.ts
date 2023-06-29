import { PrismaClient } from '@prisma/client'
import { ITeamRepository } from 'src/domain/team/team.repository'
import { Team } from 'src/domain/team/team'
import { TeamMember } from 'src/domain/team/team-member'
import { Inject, Injectable } from '@nestjs/common'
import { tokens } from 'src/tokens'
import { Pair } from 'src/domain/pair/pair'

@Injectable()
export class TeamRepository implements ITeamRepository {
  public constructor(
    @Inject(tokens.PrismaClient)
    private prismaClient: PrismaClient,
  ) {}

  public async findById(id: string): Promise<Team | null> {
    const team = await this.prismaClient.team.findUnique({
      where: { id },
      include: {
        members: true,
      },
    })

    return team
      ? Team.reconstruct({
          id: team.id,
          teamName: team.name,
          status: team.status,
          teamMembers: team.members.map((member) => {
            return TeamMember.reconstruct({
              id: member.id,
              participantId: member.participant_id,
            })
          }),
        })
      : null
  }

  public async findByPair(pair: Pair): Promise<Team | null> {
    const allProperties = pair.getAllProperties()

    const team = await this.prismaClient.team.findUnique({
      where: { id: allProperties.teamId.value },
      include: {
        members: true,
      },
    })

    return team
      ? Team.reconstruct({
          id: team.id,
          teamName: team.name,
          status: team.status,
          teamMembers: team.members.map((member) => {
            return TeamMember.reconstruct({
              id: member.id,
              participantId: member.participant_id,
            })
          }),
        })
      : null
  }

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
            participantId: member.participant_id,
          })
        }),
      })
    })
  }

  public async save(team: Team): Promise<void> {
    const allProperties = team.getAllProperties()
    await this.prismaClient.team.upsert({
      where: { id: team.id.value },
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

    await this.prismaClient.teamMember.deleteMany({
      where: { team_id: team.id.value },
    })

    await Promise.all(
      allProperties.teamMembers.map(async (teamMember) => {
        await this.prismaClient.teamMember.upsert({
          where: { id: teamMember.id },
          update: {
            team_id: team.id.value,
            participant_id: teamMember.participantId,
          },
          create: {
            id: teamMember.id,
            team_id: team.id.value,
            participant_id: teamMember.participantId,
          },
        })
      }),
    )
  }
}

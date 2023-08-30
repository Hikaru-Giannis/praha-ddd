import { Inject, Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { PairId } from 'src/domain/pair/PairId'
import { PairName } from 'src/domain/pair/PairName'
import { Pair } from 'src/domain/pair/pair'
import { PairMember } from 'src/domain/pair/pair-member'
import { IPairRepository } from 'src/domain/pair/pair.repository'
import { ParticipantId } from 'src/domain/participant/ParticipantId'
import { TeamId } from 'src/domain/team/TeamId'
import { tokens } from 'src/tokens'

@Injectable()
export class PairRepository implements IPairRepository {
  public constructor(
    @Inject(tokens.PrismaClient)
    private prismaClient: PrismaClient,
  ) {}

  public async findById(id: PairId): Promise<Pair | null> {
    const pair = await this.prismaClient.pair.findUnique({
      where: { id: id.value },
      include: { members: true },
    })

    return pair
      ? Pair.reconstruct({
          ...pair,
          teamId: pair.team_id,
          pairName: new PairName(pair.name),
          pairMembers: pair.members.map((member) =>
            PairMember.reconstruct({
              ...member,
              participantId: member.participant_id,
            }),
          ),
        })
      : null
  }

  public async findByParticipantId(
    participantId: ParticipantId,
  ): Promise<Pair | null> {
    const pair = await this.prismaClient.pair.findFirst({
      where: {
        members: {
          some: {
            participant_id: participantId.value,
          },
        },
      },
      include: { members: true },
    })

    return pair
      ? Pair.reconstruct({
          ...pair,
          teamId: pair.team_id,
          pairName: new PairName(pair.name),
          pairMembers: pair.members.map((member) =>
            PairMember.reconstruct({
              ...member,
              participantId: member.participant_id,
            }),
          ),
        })
      : null
  }

  public async findManyByTeamId(teamId: TeamId) {
    const pairs = await this.prismaClient.pair.findMany({
      where: { team_id: teamId.value },
      include: { members: true },
    })

    return pairs.map((pair) =>
      Pair.reconstruct({
        ...pair,
        teamId: pair.team_id,
        pairName: new PairName(pair.name),
        pairMembers: pair.members.map((member) =>
          PairMember.reconstruct({
            ...member,
            participantId: member.participant_id,
          }),
        ),
      }),
    )
  }

  public async findAll() {
    const pairs = await this.prismaClient.pair.findMany({
      include: { members: true },
    })

    return pairs.map((pair) =>
      Pair.reconstruct({
        ...pair,
        teamId: pair.team_id,
        pairName: new PairName(pair.name),
        pairMembers: pair.members.map((member) =>
          PairMember.reconstruct({
            ...member,
            participantId: member.participant_id,
          }),
        ),
      }),
    )
  }

  public async save(pair: Pair): Promise<void> {
    const allProperties = pair.getAllProperties()

    await this.prismaClient.pair.upsert({
      where: { id: pair.id.value },
      update: {
        team_id: allProperties.teamId.value,
        name: allProperties.pairName.value,
      },
      create: {
        id: allProperties.id,
        team_id: allProperties.teamId.value,
        name: allProperties.pairName.value,
      },
    })

    await this.prismaClient.pairMember.deleteMany({
      where: { pair_id: pair.id.value },
    })

    await Promise.all(
      allProperties.pairMembers.map(async (pairMember) => {
        await this.prismaClient.pairMember.create({
          data: {
            id: pairMember.id,
            pair_id: pair.id.value,
            participant_id: pairMember.participantId,
          },
        })
      }),
    )
  }

  public async delete(pair: Pair): Promise<void> {
    await this.prismaClient.pair.delete({ where: { id: pair.id.value } })
  }
}

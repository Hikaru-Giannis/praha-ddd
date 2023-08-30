import { Injectable } from '@nestjs/common'
import { PairId } from 'src/domain/pair/PairId'
import { Pair } from 'src/domain/pair/pair'
import { IPairRepository } from 'src/domain/pair/pair.repository'
import { ParticipantId } from 'src/domain/participant/ParticipantId'
import { TeamId } from 'src/domain/team/TeamId'

@Injectable()
export class PairInMemoryRepository implements IPairRepository {
  public items: Pair[] = []

  public async findById(pairId: PairId): Promise<Pair | null> {
    return this.items.find((item) => item.id.equals(pairId)) ?? null
  }

  public async findByParticipantId(
    participantId: ParticipantId,
  ): Promise<Pair | null> {
    return this.items.find((item) => item.hasPairMember(participantId)) ?? null
  }

  public async findManyByTeamId(teamId: TeamId): Promise<Pair[]> {
    return this.items.filter((item) => item.teamId.equals(teamId))
  }

  public async findAll(): Promise<Pair[]> {
    return this.items
  }

  public async save(pair: Pair): Promise<void> {
    const foundIndex = this.items.findIndex((item) => {
      return item.id.equals(pair.id)
    })

    if (foundIndex === -1) {
      this.items.push(pair)
    } else {
      this.items[foundIndex] = pair
    }
  }

  public async delete(pair: Pair): Promise<void> {
    this.items = this.items.filter((item) => !item.id.equals(pair.id))
  }
}

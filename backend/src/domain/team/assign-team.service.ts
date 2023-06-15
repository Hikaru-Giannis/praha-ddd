import { Participant } from '../participant/participant'
import { ITeamRepository } from './team.repository'

export class AssignTeamService {
  public constructor(private readonly teamRepository: ITeamRepository) {}

  public async assign(participant: Participant): Promise<void> {
    console.log(participant)
  }
}

import { ITeamRepository } from 'src/domain/team/team.repository'

export function createMockRepository(): ITeamRepository {
  return ({
    fetchAll: jest.fn(),
    save: jest.fn(),
  } as unknown) as ITeamRepository
}

import { Body, Controller, Inject, Param, Patch } from '@nestjs/common'
import { tokens } from 'src/tokens'
import { ChangePairUseCase } from 'src/app/team/change-pair.usecase'
import { PatchTeamRequest } from './request/patch-team-request'

@Controller('team')
export class TeamPatchController {
  constructor(
    @Inject(tokens.ChangePairUseCase)
    private readonly changePairUseCase: ChangePairUseCase,
  ) {}
  @Patch(':teamId/pairs')
  async patchTeam(
    @Param('teamId') teamId: string,
    @Body() putParticipantDto: PatchTeamRequest,
  ): Promise<{
    status: number
  }> {
    try {
      await this.changePairUseCase.do(teamId, putParticipantDto.pair.id)
      return { status: 200 }
    } catch (e) {
      console.error(e)
      return { status: 500 }
    }
  }
}

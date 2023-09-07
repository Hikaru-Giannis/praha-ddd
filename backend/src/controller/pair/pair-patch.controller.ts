import { Body, Controller, Inject, Param, Patch } from '@nestjs/common'
import { ChangePaiticipantUseCase } from 'src/app/pair/change-participant.usecase'
import { tokens } from 'src/tokens'
import { PatchParticipantRequest } from './request/patch-pair-request'

@Controller('pair')
export class PairPatchController {
  constructor(
    @Inject(tokens.ChangePaiticipantUseCase)
    private readonly changePaiticipantUseCase: ChangePaiticipantUseCase,
  ) {}
  @Patch(':pairId/participants')
  async patchTeam(
    @Param('pairId') pairId: string,
    @Body() putParticipantDto: PatchParticipantRequest,
  ): Promise<{
    status: number
  }> {
    try {
      await this.changePaiticipantUseCase.do(
        putParticipantDto.participant.id,
        pairId,
      )
      return { status: 200 }
    } catch (e) {
      console.error(e)
      return { status: 500 }
    }
  }
}

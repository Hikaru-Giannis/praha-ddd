import { ApiProperty } from '@nestjs/swagger'
import { IsIn, IsNotEmpty } from 'class-validator'
import {
  PARTICIPANT_STATUS,
  ParticipantStatusType,
} from 'src/domain/participant/ParticipantStatus'

export class PatchParticipantRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsIn(Object.values(PARTICIPANT_STATUS))
  readonly status!: ParticipantStatusType
}

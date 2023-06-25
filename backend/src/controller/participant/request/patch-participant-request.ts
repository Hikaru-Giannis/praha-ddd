import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { ParticipantStatusType } from 'src/domain/participant/ParticipantStatus'

export class PatchParticipantRequest {
  @ApiProperty()
  @IsNotEmpty()
  readonly status!: ParticipantStatusType
}

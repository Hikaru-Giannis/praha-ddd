import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { ParticipantStatusType } from 'src/domain/participant/ParticipantStatus'

export class PutParticipantRequest {
  @ApiProperty()
  @IsNotEmpty()
  readonly id!: string

  @ApiProperty()
  @IsNotEmpty()
  readonly status!: ParticipantStatusType
}

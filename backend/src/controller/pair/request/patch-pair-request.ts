import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class ParticipantDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly id!: string

  @ApiProperty()
  @IsNotEmpty()
  readonly name!: string
}

export class PatchParticipantRequest {
  @ApiProperty({ type: ParticipantDto })
  @IsNotEmpty()
  readonly participant!: ParticipantDto
}

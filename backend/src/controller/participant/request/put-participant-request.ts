import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Status } from 'src/domain/participant/participant'

export class PutParticipantRequest {
  @ApiProperty()
  @IsNotEmpty()
  readonly id!: string

  @ApiProperty()
  @IsNotEmpty()
  readonly status!: Status
}

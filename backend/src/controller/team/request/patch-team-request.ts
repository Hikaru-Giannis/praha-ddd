import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class PairDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly id!: string

  @ApiProperty()
  @IsNotEmpty()
  readonly name!: string
}

export class PatchTeamRequest {
  @ApiProperty({ type: PairDto })
  @IsNotEmpty()
  readonly pair!: PairDto
}

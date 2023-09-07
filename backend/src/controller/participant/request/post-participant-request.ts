import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class PostParticipantRequest {
  @ApiProperty()
  @IsNotEmpty()
  readonly name!: string

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email!: string
}

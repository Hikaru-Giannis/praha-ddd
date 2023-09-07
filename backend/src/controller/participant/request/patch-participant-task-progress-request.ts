import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { TaskProgressStatusType } from 'src/domain/task-progress/TaskProgressStatus'

export class PatchParticipantTaskProgressRequest {
  @ApiProperty()
  @IsNotEmpty()
  readonly taskId!: string

  @ApiProperty()
  @IsNotEmpty()
  readonly status!: TaskProgressStatusType
}

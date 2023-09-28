import { ApiProperty } from '@nestjs/swagger'
import { IsIn, IsNotEmpty } from 'class-validator'
import {
  TASK_STATUS,
  TaskProgressStatusType,
} from 'src/domain/task-progress/TaskProgressStatus'

export class SearchParticipantRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsIn(Object.values(TASK_STATUS))
  readonly status!: TaskProgressStatusType

  @ApiProperty()
  @IsNotEmpty()
  readonly task_ids!: string[]

  @ApiProperty()
  @IsNotEmpty()
  readonly page!: number

  @ApiProperty()
  @IsNotEmpty()
  readonly limit!: number
}

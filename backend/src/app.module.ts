import { Module } from '@nestjs/common'
import { SampleController } from './controller/sample/some-data.controller'
import { ParticipantController } from './controller/participant/participant.controller'

// memo: DIコンテナとしては使わないため、controllerの追加だけしてください
@Module({
  imports: [],
  controllers: [SampleController, ParticipantController],
  providers: [],
})
export class AppModule {}

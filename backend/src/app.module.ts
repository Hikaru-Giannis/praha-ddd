import { Module } from '@nestjs/common'
import { SampleController } from './controller/sample/some-data.controller'
import { ParticipantController } from './controller/participant/participant.controller'
import { tokens } from './tokens'
import { ParticipantRepository } from './infra/db/repository/participant/participant.repository'

@Module({
  imports: [],
  controllers: [SampleController, ParticipantController],
  providers: [
    {
      provide: tokens.IParticipantRepository,
      useClass: ParticipantRepository,
    },
  ],
})
export class AppModule {}

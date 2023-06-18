import { Module } from '@nestjs/common'
import { SampleController } from './controller/sample/some-data.controller'
import { ParticipantController } from './controller/participant/participant.controller'
import { tokens } from './tokens'
import { ParticipantRepository } from './infra/db/repository/participant/participant.repository'
import { TeamController } from './controller/team/team.controller'
import { PrismaClient } from '@prisma/client'
import { PairController } from './controller/pair/pair.controller'

@Module({
  imports: [],
  controllers: [
    SampleController,
    ParticipantController,
    TeamController,
    PairController,
  ],
  providers: [
    {
      provide: tokens.IParticipantRepository,
      useClass: ParticipantRepository,
    },
    {
      provide: tokens.PrismaClient,
      useValue: PrismaClient,
    },
  ],
})
export class AppModule {}

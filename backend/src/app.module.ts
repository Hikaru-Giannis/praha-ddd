import { Module } from '@nestjs/common'
import { SampleController } from './controller/sample/some-data.controller'
import { ParticipantController } from './controller/participant/participant.controller'
import { tokens } from './tokens'
import { ParticipantRepository } from './infra/db/repository/participant/participant.repository'
import { TeamController } from './controller/team/team.controller'
import { PrismaClient } from '@prisma/client'
import { PairController } from './controller/pair/pair.controller'
import { ParticipantIndexController } from './controller/participant/participant-index.controller'
import { ParticipantQS } from './infra/db/query-service/participant/participant.qs'
import { GetParticipantIndexUseCase } from './app/participant/get-participant-index.usecase'
import { ValidateEmailUniquenessService } from './domain/participant/validate-email-uniqueness.service'
import { TeamRepository } from './infra/db/repository/team/team.repository'
import { PairRepository } from './infra/db/repository/pair/pair.repository'

@Module({
  imports: [],
  controllers: [
    SampleController,
    ParticipantController,
    ParticipantIndexController,
    TeamController,
    PairController,
  ],
  providers: [
    {
      provide: tokens.IParticipantRepository,
      useClass: ParticipantRepository,
    },
    {
      provide: tokens.ITeamRepository,
      useClass: TeamRepository,
    },
    {
      provide: tokens.IPairRepository,
      useClass: PairRepository,
    },
    {
      provide: tokens.PrismaClient,
      useClass: PrismaClient,
    },
    {
      provide: tokens.IParticipantQS,
      useClass: ParticipantQS,
    },
    {
      provide: tokens.GetParticipantIndexUseCase,
      useClass: GetParticipantIndexUseCase,
    },
    {
      provide: tokens.ValidateEmailUniquenessService,
      useClass: ValidateEmailUniquenessService,
    },
  ],
})
export class AppModule {}

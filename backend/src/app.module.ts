import { Module } from '@nestjs/common'
import { SampleController } from './controller/sample/some-data.controller'
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
import { ParticipantPostController } from './controller/participant/participant-post.controller'
import { StoreParticipantUseCase } from './app/participant/store-participant.usecase'
import { PutParticipantUseCase } from './app/participant/put-participant.usecase'
import { ParticipantPutController } from './controller/participant/participant-put.controller'

@Module({
  imports: [],
  controllers: [
    SampleController,
    ParticipantIndexController,
    ParticipantPostController,
    ParticipantPutController,
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
    {
      provide: tokens.StoreParticipantUseCase,
      useClass: StoreParticipantUseCase,
    },

    {
      provide: tokens.PutParticipantUseCase,
      useClass: PutParticipantUseCase,
    },
  ],
})
export class AppModule {}

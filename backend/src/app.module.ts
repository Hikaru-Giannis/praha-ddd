import { Module } from '@nestjs/common'
import { SampleController } from './controller/sample/some-data.controller'
import { tokens } from './tokens'
import { ParticipantRepository } from './infra/db/repository/participant/participant.repository'
import { TeamIndexController } from './controller/team/team-index.controller'
import { PrismaClient } from '@prisma/client'
import { PairIndexController } from './controller/pair/pair-index.controller'
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
import { GetTeamIndexUseCase } from './app/team/get-team-index.usecase'
import { TeamQS } from './infra/db/query-service/team/team.qs'
import { GetPairIndexUseCase } from './app/pair/get-pair.index.usecase'
import { PairQS } from './infra/db/query-service/pair/pair.qs'
import { TeamPatchController } from './controller/team/team-patch.controller'
import { ChangePairUseCase } from './app/team/change-pair.usecase'

@Module({
  imports: [],
  controllers: [
    SampleController,
    ParticipantIndexController,
    ParticipantPostController,
    ParticipantPutController,
    TeamIndexController,
    TeamPatchController,
    PairIndexController,
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
    {
      provide: tokens.GetTeamIndexUseCase,
      useClass: GetTeamIndexUseCase,
    },
    {
      provide: tokens.ITeamQS,
      useClass: TeamQS,
    },
    {
      provide: tokens.GetPairIndexUseCase,
      useClass: GetPairIndexUseCase,
    },
    {
      provide: tokens.IPairQS,
      useClass: PairQS,
    },
    {
      provide: tokens.ChangePairUseCase,
      useClass: ChangePairUseCase,
    },
  ],
})
export class AppModule {}

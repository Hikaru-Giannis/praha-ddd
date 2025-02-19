import { Module } from '@nestjs/common'
import { tokens } from './tokens'
import { ParticipantDbRepository } from './infra/db/repository/participant/participant.db.repository'
import { TeamIndexController } from './controller/team/team-index.controller'
import { PrismaClient } from '@prisma/client'
import { PairIndexController } from './controller/pair/pair-index.controller'
import { ParticipantIndexController } from './controller/participant/participant-index.controller'
import { ParticipantQS } from './infra/db/query-service/participant/participant.qs'
import { GetParticipantIndexUseCase } from './app/participant/get-participant-index.usecase'
import { ValidateEmailUniquenessService } from './domain/participant/validate-email-uniqueness.service'
import { TeamDbRepository } from './infra/db/repository/team/team.db.repository'
import { PairDbRepository } from './infra/db/repository/pair/pair.db.repository'
import { ParticipantPostController } from './controller/participant/participant-post.controller'
import { StoreParticipantUseCase } from './app/participant/store-participant.usecase'
import { ParticipantPatchController } from './controller/participant/participant-patch.controller'
import { GetTeamIndexUseCase } from './app/team/get-team-index.usecase'
import { TeamQS } from './infra/db/query-service/team/team.qs'
import { GetPairIndexUseCase } from './app/pair/get-pair.index.usecase'
import { PairQS } from './infra/db/query-service/pair/pair.qs'
import { TeamPatchController } from './controller/team/team-patch.controller'
import { ChangePairUseCase } from './app/team/change-pair.usecase'
import { PairPatchController } from './controller/pair/pair-patch.controller'
import { ChangePaiticipantUseCase } from './app/pair/change-participant.usecase'
import { AssignTeamService } from './domain/team/assign-team.service'
import { AssignPairService } from './domain/pair/assign-pair.service'
import { ChangeTaskProgressUseCase } from './app/pair/change-task-progress.usecase'
import { TaskProgressDbRepository } from './infra/db/repository/task-progress/task-progress.db.repository'
import { ParticipantPatchTaskProgressController } from './controller/participant/participant-patch-task-progress.controller'
import { ParticipantSearchQS } from './infra/db/query-service/participant/participant-search.qs'
import { GetParticipantSearchUseCase } from './app/participant/get-participant-search.usecase'
import { ParticipantSearchController } from './controller/participant/participant-search.controller'
import { PatchParticipantingUseCase } from './app/participant/patch-participanting.usecase'
import { PatchAdjourningUseCase } from './app/participant/patch-adjourning.usecase'
import { PatchWithdrawnUseCase } from './app/participant/patch-withdrawn.usecase'
import { TaskDbRepository } from './infra/db/repository/task/task.db.repository'
import { AssignTaskProgressesService } from './domain/task-progress/assign-task-progresses.service'
import { EmailMockSender } from './infra/email/email.mock.repository'

@Module({
  imports: [],
  controllers: [
    ParticipantIndexController,
    ParticipantPostController,
    ParticipantPatchController,
    TeamIndexController,
    TeamPatchController,
    PairIndexController,
    PairPatchController,
    ParticipantPatchTaskProgressController,
    ParticipantSearchController,
  ],
  providers: [
    {
      provide: tokens.IParticipantRepository,
      useClass: ParticipantDbRepository,
    },
    {
      provide: tokens.ITeamRepository,
      useClass: TeamDbRepository,
    },
    {
      provide: tokens.IPairRepository,
      useClass: PairDbRepository,
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
      provide: tokens.PatchParticipantingUseCase,
      useClass: PatchParticipantingUseCase,
    },
    {
      provide: tokens.PatchAdjourningUseCase,
      useClass: PatchAdjourningUseCase,
    },
    {
      provide: tokens.PatchWithdrawnUseCase,
      useClass: PatchWithdrawnUseCase,
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
    {
      provide: tokens.ChangePaiticipantUseCase,
      useClass: ChangePaiticipantUseCase,
    },
    {
      provide: tokens.AssignTeamService,
      useClass: AssignTeamService,
    },
    {
      provide: tokens.AssignPairService,
      useClass: AssignPairService,
    },
    {
      provide: tokens.ChangeTaskProgressUseCase,
      useClass: ChangeTaskProgressUseCase,
    },
    {
      provide: tokens.ITaskRepository,
      useClass: TaskDbRepository,
    },
    {
      provide: tokens.ITaskProgressRepository,
      useClass: TaskProgressDbRepository,
    },
    {
      provide: tokens.IParticipantSearchQS,
      useClass: ParticipantSearchQS,
    },
    {
      provide: tokens.GetParticipantSearchUseCase,
      useClass: GetParticipantSearchUseCase,
    },
    {
      provide: tokens.AssignTaskProgressesService,
      useClass: AssignTaskProgressesService,
    },
    {
      provide: tokens.EmailSender,
      useClass: EmailMockSender,
    },
  ],
})
export class AppModule {}

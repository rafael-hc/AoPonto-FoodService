import { Module } from '@nestjs/common'
import { DeleteWizardQuestionUseCase } from './application/use-cases/delete-wizard-question.use-case'
import {
  makeFetchProductWizardsUseCase,
  makeSyncProductWizardsUseCase
} from './application/use-cases/factories/make-product-wizard-use-cases'
import {
  makeDeleteWizardQuestionUseCase,
  makeGetWizardQuestionUseCase,
  makeListWizardQuestionsUseCase,
  makeSynchronizeWizardQuestionUseCase
} from './application/use-cases/factories/make-wizard-use-cases'
import { FetchProductWizardsUseCase } from './application/use-cases/fetch-product-wizards.use-case'
import { GetWizardQuestionUseCase } from './application/use-cases/get-wizard-question.use-case'
import { ListWizardQuestionsUseCase } from './application/use-cases/list-wizard-questions.use-case'
import { SyncProductWizardsUseCase } from './application/use-cases/sync-product-wizards.use-case'
import { SynchronizeWizardQuestionUseCase } from './application/use-cases/synchronize-wizard-question.use-case'
import {
  ProductWizardsRepository,
  WizardQuestionsRepository
} from './domain/repositories/wizard-repositories'
import { PrismaProductWizardsRepository } from './infrastructure/database/prisma/repositories/prisma-product-wizards-repository'
import { PrismaWizardQuestionsRepository } from './infrastructure/database/prisma/repositories/prisma-wizard-questions-repository'
import { ProductWizardsController } from './presentation/controllers/product-wizards.controller'
import { WizardQuestionsController } from './presentation/controllers/wizard-questions.controller'

@Module({
  controllers: [WizardQuestionsController, ProductWizardsController],
  providers: [
    // Repositories
    {
      provide: WizardQuestionsRepository,
      useClass: PrismaWizardQuestionsRepository
    },
    {
      provide: ProductWizardsRepository,
      useClass: PrismaProductWizardsRepository
    },

    // Wizard Question Use Cases
    {
      provide: SynchronizeWizardQuestionUseCase,
      useFactory: makeSynchronizeWizardQuestionUseCase,
      inject: [WizardQuestionsRepository]
    },
    {
      provide: ListWizardQuestionsUseCase,
      useFactory: makeListWizardQuestionsUseCase,
      inject: [WizardQuestionsRepository]
    },
    {
      provide: GetWizardQuestionUseCase,
      useFactory: makeGetWizardQuestionUseCase,
      inject: [WizardQuestionsRepository]
    },
    {
      provide: DeleteWizardQuestionUseCase,
      useFactory: makeDeleteWizardQuestionUseCase,
      inject: [WizardQuestionsRepository]
    },

    // Product Wizard Use Cases
    {
      provide: SyncProductWizardsUseCase,
      useFactory: makeSyncProductWizardsUseCase,
      inject: [ProductWizardsRepository]
    },
    {
      provide: FetchProductWizardsUseCase,
      useFactory: makeFetchProductWizardsUseCase,
      inject: [ProductWizardsRepository]
    }
  ],
  exports: [WizardQuestionsRepository, ProductWizardsRepository]
})
export class WizardModule {}

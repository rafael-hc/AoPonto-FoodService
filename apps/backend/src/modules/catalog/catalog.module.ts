import { Module } from '@nestjs/common'
import { DeleteKitchenUseCase } from './application/use-cases/delete-kitchen.use-case'
import { DeleteLabelUseCase } from './application/use-cases/delete-label.use-case'
import { DeleteProductUseCase } from './application/use-cases/delete-product.use-case'
import { DeleteProductTypeUseCase } from './application/use-cases/delete-product-type.use-case'
import { DeleteUnitUseCase } from './application/use-cases/delete-unit.use-case'
import { EditKitchenUseCase } from './application/use-cases/edit-kitchen.use-case'
import { EditLabelUseCase } from './application/use-cases/edit-label.use-case'
import { EditProductUseCase } from './application/use-cases/edit-product.use-case'
import { EditProductTypeUseCase } from './application/use-cases/edit-product-type.use-case'
import { EditUnitUseCase } from './application/use-cases/edit-unit.use-case'
import { makeDeleteProductUseCase } from './application/use-cases/factories/make-delete-product-use-case'
import { makeEditProductUseCase } from './application/use-cases/factories/make-edit-product-use-case'
import { makeFetchProductsUseCase } from './application/use-cases/factories/make-fetch-products-use-case'
import {
  makeDeleteKitchenUseCase,
  makeEditKitchenUseCase,
  makeFetchKitchensUseCase,
  makeRegisterKitchenUseCase
} from './application/use-cases/factories/make-kitchen-use-cases'
import {
  makeDeleteLabelUseCase,
  makeEditLabelUseCase,
  makeFetchLabelsUseCase,
  makeRegisterLabelUseCase
} from './application/use-cases/factories/make-label-use-cases'
import {
  makeDeleteProductTypeUseCase,
  makeEditProductTypeUseCase,
  makeFetchProductTypesUseCase,
  makeRegisterProductTypeUseCase
} from './application/use-cases/factories/make-product-type-use-cases'
import { makeRegisterProductUseCase } from './application/use-cases/factories/make-register-product-use-case'
import {
  makeDeleteUnitUseCase,
  makeEditUnitUseCase,
  makeFetchUnitsUseCase,
  makeRegisterUnitUseCase
} from './application/use-cases/factories/make-unit-use-cases'
import { FetchKitchensUseCase } from './application/use-cases/fetch-kitchens.use-case'
import { FetchLabelsUseCase } from './application/use-cases/fetch-labels.use-case'
import { FetchProductTypesUseCase } from './application/use-cases/fetch-product-types.use-case'
import { FetchProductsUseCase } from './application/use-cases/fetch-products.use-case'
import { FetchUnitsUseCase } from './application/use-cases/fetch-units.use-case'
import { RegisterKitchenUseCase } from './application/use-cases/register-kitchen.use-case'
import { RegisterLabelUseCase } from './application/use-cases/register-label.use-case'
import { RegisterProductUseCase } from './application/use-cases/register-product.use-case'
import { RegisterProductTypeUseCase } from './application/use-cases/register-product-type.use-case'
import { RegisterUnitUseCase } from './application/use-cases/register-unit.use-case'
import {
  ProductDetailsRepository,
  ProductPersonalizedRepository,
  ProductSizesRepository
} from './domain/repositories/customization-repositories'
import { KitchensRepository } from './domain/repositories/kitchens-repository'
import { LabelsRepository } from './domain/repositories/labels-repository'
import { ProductTypesRepository } from './domain/repositories/product-types-repository'
import { ProductsRepository } from './domain/repositories/products-repository'
import { UnitsRepository } from './domain/repositories/units-repository'

import {
  PrismaProductDetailsRepository,
  PrismaProductPersonalizedRepository,
  PrismaProductSizesRepository
} from './infrastructure/database/prisma/repositories/prisma-customization-repositories'
import { PrismaKitchensRepository } from './infrastructure/database/prisma/repositories/prisma-kitchens-repository'
import { PrismaLabelsRepository } from './infrastructure/database/prisma/repositories/prisma-labels-repository'
import { PrismaProductTypesRepository } from './infrastructure/database/prisma/repositories/prisma-product-types-repository'
import { PrismaProductsRepository } from './infrastructure/database/prisma/repositories/prisma-products-repository'
import { PrismaUnitsRepository } from './infrastructure/database/prisma/repositories/prisma-units-repository'
import { WizardQuestionsRepository, ProductWizardsRepository } from './domain/repositories/wizard-repositories'
import { PrismaWizardQuestionsRepository } from './infrastructure/database/prisma/repositories/prisma-wizard-questions-repository'
import { PrismaProductWizardsRepository } from './infrastructure/database/prisma/repositories/prisma-product-wizards-repository'
import { ComplementsController } from './presentation/controllers/complements.controller'
import { KitchensController } from './presentation/controllers/kitchens.controller'
import { LabelsController } from './presentation/controllers/labels.controller'
import { ProductTypesController } from './presentation/controllers/product-types.controller'
import { ProductsController } from './presentation/controllers/products.controller'
import { UnitsController } from './presentation/controllers/units.controller'
import { WizardQuestionsController } from './presentation/controllers/wizard-questions.controller'
import { ProductWizardsController } from './presentation/controllers/product-wizards.controller'

import {
  makeSynchronizeWizardQuestionUseCase,
  makeListWizardQuestionsUseCase,
  makeGetWizardQuestionUseCase,
  makeDeleteWizardQuestionUseCase
} from './application/use-cases/factories/make-wizard-use-cases'
import {
  makeSyncProductWizardsUseCase,
  makeFetchProductWizardsUseCase
} from './application/use-cases/factories/make-product-wizard-use-cases'
import { SynchronizeWizardQuestionUseCase } from './application/use-cases/synchronize-wizard-question.use-case'
import { ListWizardQuestionsUseCase } from './application/use-cases/list-wizard-questions.use-case'
import { GetWizardQuestionUseCase } from './application/use-cases/get-wizard-question.use-case'
import { DeleteWizardQuestionUseCase } from './application/use-cases/delete-wizard-question.use-case'
import { SyncProductWizardsUseCase } from './application/use-cases/sync-product-wizards.use-case'
import { FetchProductWizardsUseCase } from './application/use-cases/fetch-product-wizards.use-case'

@Module({
  imports: [],
  controllers: [
    ProductsController,
    ComplementsController,
    KitchensController,
    LabelsController,
    UnitsController,
    ProductTypesController,
    WizardQuestionsController,
    ProductWizardsController
  ],
  providers: [
    // Repositories
    { provide: ProductsRepository, useClass: PrismaProductsRepository },
    { provide: KitchensRepository, useClass: PrismaKitchensRepository },
    { provide: LabelsRepository, useClass: PrismaLabelsRepository },
    { provide: UnitsRepository, useClass: PrismaUnitsRepository },
    { provide: ProductTypesRepository, useClass: PrismaProductTypesRepository },
    {
      provide: ProductPersonalizedRepository,
      useClass: PrismaProductPersonalizedRepository
    },
    { provide: ProductSizesRepository, useClass: PrismaProductSizesRepository },
    {
      provide: ProductDetailsRepository,
      useClass: PrismaProductDetailsRepository
    },
    { provide: WizardQuestionsRepository, useClass: PrismaWizardQuestionsRepository },
    { provide: ProductWizardsRepository, useClass: PrismaProductWizardsRepository },


    // Product Use Cases
    {
      provide: RegisterProductUseCase,
      useFactory: makeRegisterProductUseCase,
      inject: [ProductsRepository]
    },
    {
      provide: FetchProductsUseCase,
      useFactory: makeFetchProductsUseCase,
      inject: [ProductsRepository]
    },
    {
      provide: EditProductUseCase,
      useFactory: makeEditProductUseCase,
      inject: [ProductsRepository]
    },
    {
      provide: DeleteProductUseCase,
      useFactory: makeDeleteProductUseCase,
      inject: [ProductsRepository]
    },

    // Kitchen Use Cases
    {
      provide: RegisterKitchenUseCase,
      useFactory: makeRegisterKitchenUseCase,
      inject: [KitchensRepository]
    },
    {
      provide: FetchKitchensUseCase,
      useFactory: makeFetchKitchensUseCase,
      inject: [KitchensRepository]
    },
    {
      provide: EditKitchenUseCase,
      useFactory: makeEditKitchenUseCase,
      inject: [KitchensRepository]
    },
    {
      provide: DeleteKitchenUseCase,
      useFactory: makeDeleteKitchenUseCase,
      inject: [KitchensRepository]
    },

    // Label Use Cases
    {
      provide: RegisterLabelUseCase,
      useFactory: makeRegisterLabelUseCase,
      inject: [LabelsRepository]
    },
    {
      provide: FetchLabelsUseCase,
      useFactory: makeFetchLabelsUseCase,
      inject: [LabelsRepository]
    },
    {
      provide: EditLabelUseCase,
      useFactory: makeEditLabelUseCase,
      inject: [LabelsRepository]
    },
    {
      provide: DeleteLabelUseCase,
      useFactory: makeDeleteLabelUseCase,
      inject: [LabelsRepository]
    },

    // Unit Use Cases
    {
      provide: RegisterUnitUseCase,
      useFactory: makeRegisterUnitUseCase,
      inject: [UnitsRepository]
    },
    {
      provide: FetchUnitsUseCase,
      useFactory: makeFetchUnitsUseCase,
      inject: [UnitsRepository]
    },
    {
      provide: EditUnitUseCase,
      useFactory: makeEditUnitUseCase,
      inject: [UnitsRepository]
    },
    {
      provide: DeleteUnitUseCase,
      useFactory: makeDeleteUnitUseCase,
      inject: [UnitsRepository]
    },

    // ProductType Use Cases
    {
      provide: RegisterProductTypeUseCase,
      useFactory: makeRegisterProductTypeUseCase,
      inject: [ProductTypesRepository]
    },
    {
      provide: FetchProductTypesUseCase,
      useFactory: makeFetchProductTypesUseCase,
      inject: [ProductTypesRepository]
    },
    {
      provide: EditProductTypeUseCase,
      useFactory: makeEditProductTypeUseCase,
      inject: [ProductTypesRepository]
    },
    {
      provide: DeleteProductTypeUseCase,
      useFactory: makeDeleteProductTypeUseCase,
      inject: [ProductTypesRepository]
    },

    // Wizard Use Cases
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
  exports: [
    ProductsRepository,
    KitchensRepository,
    LabelsRepository,
    UnitsRepository,
    ProductTypesRepository,
    RegisterProductUseCase,
    FetchProductsUseCase,
    EditProductUseCase,
    DeleteProductUseCase
  ]
})
export class CatalogModule {}

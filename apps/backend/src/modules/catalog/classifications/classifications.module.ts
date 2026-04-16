import { Module } from '@nestjs/common'
import { DeleteKitchenUseCase } from './application/use-cases/delete-kitchen.use-case'
import { DeleteLabelUseCase } from './application/use-cases/delete-label.use-case'
import { DeleteProductTypeUseCase } from './application/use-cases/delete-product-type.use-case'
import { DeleteUnitUseCase } from './application/use-cases/delete-unit.use-case'
import { EditKitchenUseCase } from './application/use-cases/edit-kitchen.use-case'
import { EditLabelUseCase } from './application/use-cases/edit-label.use-case'
import { EditProductTypeUseCase } from './application/use-cases/edit-product-type.use-case'
import { EditUnitUseCase } from './application/use-cases/edit-unit.use-case'
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
import {
  makeDeleteUnitUseCase,
  makeEditUnitUseCase,
  makeFetchUnitsUseCase,
  makeRegisterUnitUseCase
} from './application/use-cases/factories/make-unit-use-cases'
import { FetchKitchensUseCase } from './application/use-cases/fetch-kitchens.use-case'
import { FetchLabelsUseCase } from './application/use-cases/fetch-labels.use-case'
import { FetchProductTypesUseCase } from './application/use-cases/fetch-product-types.use-case'
import { FetchUnitsUseCase } from './application/use-cases/fetch-units.use-case'
import { RegisterKitchenUseCase } from './application/use-cases/register-kitchen.use-case'
import { RegisterLabelUseCase } from './application/use-cases/register-label.use-case'
import { RegisterProductTypeUseCase } from './application/use-cases/register-product-type.use-case'
import { RegisterUnitUseCase } from './application/use-cases/register-unit.use-case'
import { KitchensRepository } from './domain/repositories/kitchens-repository'
import { LabelsRepository } from './domain/repositories/labels-repository'
import { ProductTypesRepository } from './domain/repositories/product-types-repository'
import { UnitsRepository } from './domain/repositories/units-repository'
import { PrismaKitchensRepository } from './infrastructure/database/prisma/repositories/prisma-kitchens-repository'
import { PrismaLabelsRepository } from './infrastructure/database/prisma/repositories/prisma-labels-repository'
import { PrismaProductTypesRepository } from './infrastructure/database/prisma/repositories/prisma-product-types-repository'
import { PrismaUnitsRepository } from './infrastructure/database/prisma/repositories/prisma-units-repository'
import { KitchensController } from './presentation/controllers/kitchens.controller'
import { LabelsController } from './presentation/controllers/labels.controller'
import { ProductTypesController } from './presentation/controllers/product-types.controller'
import { UnitsController } from './presentation/controllers/units.controller'

@Module({
  controllers: [
    KitchensController,
    LabelsController,
    UnitsController,
    ProductTypesController
  ],
  providers: [
    // Repositories
    { provide: KitchensRepository, useClass: PrismaKitchensRepository },
    { provide: LabelsRepository, useClass: PrismaLabelsRepository },
    { provide: UnitsRepository, useClass: PrismaUnitsRepository },
    { provide: ProductTypesRepository, useClass: PrismaProductTypesRepository },

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
    }
  ],
  exports: [
    KitchensRepository,
    LabelsRepository,
    UnitsRepository,
    ProductTypesRepository
  ]
})
export class ClassificationsModule {}

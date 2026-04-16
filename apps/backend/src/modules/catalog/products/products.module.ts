import { Module } from '@nestjs/common'
import { DeleteProductUseCase } from './application/use-cases/delete-product.use-case'
import { EditProductUseCase } from './application/use-cases/edit-product.use-case'
import { makeDeleteProductUseCase } from './application/use-cases/factories/make-delete-product-use-case'
import { makeEditProductUseCase } from './application/use-cases/factories/make-edit-product-use-case'
import { makeFetchProductsUseCase } from './application/use-cases/factories/make-fetch-products-use-case'
import { makeRegisterProductUseCase } from './application/use-cases/factories/make-register-product-use-case'
import { FetchProductsUseCase } from './application/use-cases/fetch-products.use-case'
import { RegisterProductUseCase } from './application/use-cases/register-product.use-case'
import {
  ProductDetailsRepository,
  ProductPersonalizedRepository,
  ProductSizesRepository
} from './domain/repositories/customization-repositories'
import { ProductsRepository } from './domain/repositories/products-repository'
import {
  PrismaProductDetailsRepository,
  PrismaProductPersonalizedRepository,
  PrismaProductSizesRepository
} from './infrastructure/database/prisma/repositories/prisma-customization-repositories'
import { PrismaProductsRepository } from './infrastructure/database/prisma/repositories/prisma-products-repository'
import { ComplementsController } from './presentation/controllers/complements.controller'
import { ProductsController } from './presentation/controllers/products.controller'

@Module({
  controllers: [ProductsController, ComplementsController],
  providers: [
    // Repositories
    { provide: ProductsRepository, useClass: PrismaProductsRepository },
    {
      provide: ProductPersonalizedRepository,
      useClass: PrismaProductPersonalizedRepository
    },
    { provide: ProductSizesRepository, useClass: PrismaProductSizesRepository },
    {
      provide: ProductDetailsRepository,
      useClass: PrismaProductDetailsRepository
    },

    // Use Cases
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
    }
  ],
  exports: [
    ProductsRepository,
    RegisterProductUseCase,
    FetchProductsUseCase,
    EditProductUseCase,
    DeleteProductUseCase
  ]
})
export class ProductsModule {}

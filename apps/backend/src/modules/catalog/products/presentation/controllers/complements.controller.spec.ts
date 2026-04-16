import { Test, TestingModule } from '@nestjs/testing'
import { DeleteProductUseCase } from '@/catalog/products/application/use-cases/delete-product.use-case'
import { EditProductUseCase } from '@/catalog/products/application/use-cases/edit-product.use-case'
import { FetchProductsUseCase } from '@/catalog/products/application/use-cases/fetch-products.use-case'
import { RegisterProductUseCase } from '@/catalog/products/application/use-cases/register-product.use-case'
import { Product } from '@/catalog/products/domain/entities/product'
import { TaxMetadata } from '@/catalog/products/domain/entities/value-objects/product-tax-metadata'
import { ComplementsController } from './complements.controller'

describe('ComplementsController', () => {
  let controller: ComplementsController
  let fetchProducts: FetchProductsUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComplementsController],
      providers: [
        {
          provide: RegisterProductUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: FetchProductsUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: EditProductUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: DeleteProductUseCase,
          useValue: { execute: jest.fn() }
        }
      ]
    }).compile()

    controller = module.get<ComplementsController>(ComplementsController)
    fetchProducts = module.get<FetchProductsUseCase>(FetchProductsUseCase)
  })

  it('should fetch complements', async () => {
    const product = Product.create({
      code: 1,
      name: 'C1',
      price: 5,
      unitId: 'u1',
      productTypeId: 'COMPLEMENTO',
      taxMetadata: TaxMetadata.create({})
    })

    jest
      .spyOn(fetchProducts, 'execute')
      .mockResolvedValue({ products: [product] })

    const result = await controller.list()

    expect(result.products).toHaveLength(1)
  })
})

import { Test, TestingModule } from '@nestjs/testing'
import { DeleteProductTypeUseCase } from '@/catalog/classifications/application/use-cases/delete-product-type.use-case'
import { EditProductTypeUseCase } from '@/catalog/classifications/application/use-cases/edit-product-type.use-case'
import { FetchProductTypesUseCase } from '@/catalog/classifications/application/use-cases/fetch-product-types.use-case'
import { RegisterProductTypeUseCase } from '@/catalog/classifications/application/use-cases/register-product-type.use-case'
import { ProductType } from '@/catalog/classifications/domain/entities/product-type'
import { ProductTypesController } from './product-types.controller'

describe('ProductTypesController', () => {
  let controller: ProductTypesController
  let fetchProductTypes: FetchProductTypesUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductTypesController],
      providers: [
        {
          provide: RegisterProductTypeUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: FetchProductTypesUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: EditProductTypeUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: DeleteProductTypeUseCase,
          useValue: { execute: jest.fn() }
        }
      ]
    }).compile()

    controller = module.get<ProductTypesController>(ProductTypesController)
    fetchProductTypes = module.get<FetchProductTypesUseCase>(
      FetchProductTypesUseCase
    )
  })

  it('should fetch product types', async () => {
    const productType = ProductType.create({
      description: 'T1'
    })

    jest
      .spyOn(fetchProductTypes, 'execute')
      .mockResolvedValue({ productTypes: [productType] })

    const result = await controller.fetch()

    expect(result.productTypes).toHaveLength(1)
  })
})

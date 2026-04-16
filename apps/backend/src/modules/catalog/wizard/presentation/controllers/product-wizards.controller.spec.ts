import { Test, TestingModule } from '@nestjs/testing'
import { FetchProductWizardsUseCase } from '@/catalog/wizard/application/use-cases/fetch-product-wizards.use-case'
import { SyncProductWizardsUseCase } from '@/catalog/wizard/application/use-cases/sync-product-wizards.use-case'
import { ProductWizard } from '@/catalog/wizard/domain/entities/product-wizard'
import { ProductWizardsController } from './product-wizards.controller'

describe('ProductWizardsController', () => {
  let controller: ProductWizardsController
  let fetchProductWizards: FetchProductWizardsUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductWizardsController],
      providers: [
        {
          provide: SyncProductWizardsUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: FetchProductWizardsUseCase,
          useValue: { execute: jest.fn() }
        }
      ]
    }).compile()

    controller = module.get<ProductWizardsController>(ProductWizardsController)
    fetchProductWizards = module.get<FetchProductWizardsUseCase>(
      FetchProductWizardsUseCase
    )
  })

  it('should fetch product wizards', async () => {
    const productWizard = ProductWizard.create({
      productId: 'p1',
      wizardQuestionId: 'wq1',
      order: 0
    })

    jest
      .spyOn(fetchProductWizards, 'execute')
      .mockResolvedValue({ productWizards: [productWizard] })

    const result = await controller.fetch('p1')

    expect(result.productWizards).toHaveLength(1)
  })
})

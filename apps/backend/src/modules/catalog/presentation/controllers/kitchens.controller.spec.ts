import { Test, TestingModule } from '@nestjs/testing'
import { DeleteKitchenUseCase } from '@/catalog/application/use-cases/delete-kitchen.use-case'
import { EditKitchenUseCase } from '@/catalog/application/use-cases/edit-kitchen.use-case'
import { FetchKitchensUseCase } from '@/catalog/application/use-cases/fetch-kitchens.use-case'
import { RegisterKitchenUseCase } from '@/catalog/application/use-cases/register-kitchen.use-case'
import { Kitchen } from '@/catalog/domain/entities/kitchen'
import { KitchensController } from './kitchens.controller'

describe('KitchensController', () => {
  let controller: KitchensController
  let fetchKitchens: FetchKitchensUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KitchensController],
      providers: [
        {
          provide: RegisterKitchenUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: FetchKitchensUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: EditKitchenUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: DeleteKitchenUseCase,
          useValue: { execute: jest.fn() }
        }
      ]
    }).compile()

    controller = module.get<KitchensController>(KitchensController)
    fetchKitchens = module.get<FetchKitchensUseCase>(FetchKitchensUseCase)
  })

  it('should fetch kitchens', async () => {
    const kitchen = Kitchen.create({
      description: 'K1',
      ip: '1',
      port: '1',
      printer: '1'
    })

    jest
      .spyOn(fetchKitchens, 'execute')
      .mockResolvedValue({ kitchens: [kitchen] })

    const result = await controller.fetch()

    expect(result.kitchens).toHaveLength(1)
  })
})

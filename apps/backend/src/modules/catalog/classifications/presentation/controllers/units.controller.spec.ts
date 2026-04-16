import { Test, TestingModule } from '@nestjs/testing'
import { DeleteUnitUseCase } from '@/catalog/classifications/application/use-cases/delete-unit.use-case'
import { EditUnitUseCase } from '@/catalog/classifications/application/use-cases/edit-unit.use-case'
import { FetchUnitsUseCase } from '@/catalog/classifications/application/use-cases/fetch-units.use-case'
import { RegisterUnitUseCase } from '@/catalog/classifications/application/use-cases/register-unit.use-case'
import { Unit } from '@/catalog/classifications/domain/entities/unit'
import { UnitsController } from './units.controller'

describe('UnitsController', () => {
  let controller: UnitsController
  let fetchUnits: FetchUnitsUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnitsController],
      providers: [
        {
          provide: RegisterUnitUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: FetchUnitsUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: EditUnitUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: DeleteUnitUseCase,
          useValue: { execute: jest.fn() }
        }
      ]
    }).compile()

    controller = module.get<UnitsController>(UnitsController)
    fetchUnits = module.get<FetchUnitsUseCase>(FetchUnitsUseCase)
  })

  it('should fetch units', async () => {
    const unit = Unit.create({
      initials: 'UN',
      description: 'U1'
    })

    jest.spyOn(fetchUnits, 'execute').mockResolvedValue({ units: [unit] })

    const result = await controller.fetch()

    expect(result.units).toHaveLength(1)
  })
})

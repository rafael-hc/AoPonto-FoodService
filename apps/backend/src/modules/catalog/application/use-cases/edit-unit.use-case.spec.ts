import { Unit } from '@/catalog/domain/entities/unit'
import { InMemoryUnitsRepository } from '@/catalog/test/repositories/in-memory-units-repository'
import { EditUnitUseCase } from './edit-unit.use-case'

let unitsRepository: InMemoryUnitsRepository
let sut: EditUnitUseCase

describe('Edit Unit', () => {
  beforeEach(() => {
    unitsRepository = new InMemoryUnitsRepository()
    sut = new EditUnitUseCase(unitsRepository)
  })

  it('should be able to edit a unit', async () => {
    const unit = Unit.create({
      code: 1,
      initials: 'UN',
      description: 'Unidade'
    })

    await unitsRepository.create(unit)

    await sut.execute({
      id: unit.id,
      initials: 'KG'
    })

    expect(unitsRepository.items[0].initials).toBe('KG')
  })
})

import { Unit } from '@/catalog/classifications/domain/entities/unit'
import { InMemoryUnitsRepository } from '@/catalog/classifications/test/repositories/in-memory-units-repository'
import { DeleteUnitUseCase } from './delete-unit.use-case'

let unitsRepository: InMemoryUnitsRepository
let sut: DeleteUnitUseCase

describe('Delete Unit', () => {
  beforeEach(() => {
    unitsRepository = new InMemoryUnitsRepository()
    sut = new DeleteUnitUseCase(unitsRepository)
  })

  it('should be able to delete a unit', async () => {
    const unit = Unit.create({
      code: 1,
      initials: 'UN',
      description: 'Unidade'
    })

    await unitsRepository.create(unit)

    await sut.execute({ id: unit.id })

    expect(unitsRepository.items).toHaveLength(0)
  })
})

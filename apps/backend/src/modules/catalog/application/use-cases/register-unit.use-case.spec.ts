import { InMemoryUnitsRepository } from '@/catalog/test/repositories/in-memory-units-repository'
import { RegisterUnitUseCase } from './register-unit.use-case'

let unitsRepository: InMemoryUnitsRepository
let sut: RegisterUnitUseCase

describe('Register Unit', () => {
  beforeEach(() => {
    unitsRepository = new InMemoryUnitsRepository()
    sut = new RegisterUnitUseCase(unitsRepository)
  })

  it('should be able to register a unit', async () => {
    const { unit } = await sut.execute({
      initials: 'UN',
      description: 'Unidade'
    })

    expect(unit.id).toBeTruthy()
    expect(unitsRepository.items).toHaveLength(1)
  })
})

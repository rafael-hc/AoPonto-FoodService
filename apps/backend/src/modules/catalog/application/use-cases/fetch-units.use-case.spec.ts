import { Unit } from '@/catalog/domain/entities/unit'
import { InMemoryUnitsRepository } from '@/catalog/test/repositories/in-memory-units-repository'
import { FetchUnitsUseCase } from './fetch-units.use-case'

let unitsRepository: InMemoryUnitsRepository
let sut: FetchUnitsUseCase

describe('Fetch Units', () => {
  beforeEach(() => {
    unitsRepository = new InMemoryUnitsRepository()
    sut = new FetchUnitsUseCase(unitsRepository)
  })

  it('should be able to fetch units', async () => {
    await unitsRepository.create(
      Unit.create({
        code: 1,
        initials: 'UN',
        description: 'U1'
      })
    )

    const { units } = await sut.execute()

    expect(units).toHaveLength(1)
  })
})

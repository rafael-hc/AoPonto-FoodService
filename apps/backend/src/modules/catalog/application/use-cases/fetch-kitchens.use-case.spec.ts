import { Kitchen } from '@/catalog/domain/entities/kitchen'
import { InMemoryKitchensRepository } from '@/catalog/test/repositories/in-memory-kitchens-repository'
import { FetchKitchensUseCase } from './fetch-kitchens.use-case'

let kitchensRepository: InMemoryKitchensRepository
let sut: FetchKitchensUseCase

describe('Fetch Kitchens', () => {
  beforeEach(() => {
    kitchensRepository = new InMemoryKitchensRepository()
    sut = new FetchKitchensUseCase(kitchensRepository)
  })

  it('should be able to fetch kitchens', async () => {
    await kitchensRepository.create(
      Kitchen.create({
        code: 1,
        description: 'C 1',
        ip: '1',
        port: '1',
        printer: '1'
      })
    )
    await kitchensRepository.create(
      Kitchen.create({
        code: 2,
        description: 'C 2',
        ip: '2',
        port: '2',
        printer: '2'
      })
    )

    const { kitchens } = await sut.execute()

    expect(kitchens).toHaveLength(2)
  })
})

import { Kitchen } from '@/catalog/domain/entities/kitchen'
import { InMemoryKitchensRepository } from '@/catalog/test/repositories/in-memory-kitchens-repository'
import { DeleteKitchenUseCase } from './delete-kitchen.use-case'

let kitchensRepository: InMemoryKitchensRepository
let sut: DeleteKitchenUseCase

describe('Delete Kitchen', () => {
  beforeEach(() => {
    kitchensRepository = new InMemoryKitchensRepository()
    sut = new DeleteKitchenUseCase(kitchensRepository)
  })

  it('should be able to delete a kitchen', async () => {
    const kitchen = Kitchen.create({
      code: 1,
      description: 'Cozinha 1',
      ip: '1.1.1.1',
      port: '80',
      printer: 'P1'
    })

    await kitchensRepository.create(kitchen)

    await sut.execute({ id: kitchen.id })

    expect(kitchensRepository.items).toHaveLength(0)
  })
})

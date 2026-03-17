import { Kitchen } from '@/catalog/domain/entities/kitchen'
import { InMemoryKitchensRepository } from '@/catalog/test/repositories/in-memory-kitchens-repository'
import { EditKitchenUseCase } from './edit-kitchen.use-case'

let kitchensRepository: InMemoryKitchensRepository
let sut: EditKitchenUseCase

describe('Edit Kitchen', () => {
  beforeEach(() => {
    kitchensRepository = new InMemoryKitchensRepository()
    sut = new EditKitchenUseCase(kitchensRepository)
  })

  it('should be able to edit a kitchen', async () => {
    const kitchen = Kitchen.create({
      code: 1,
      description: 'Cozinha 1',
      ip: '1.1.1.1',
      port: '80',
      printer: 'P1'
    })

    await kitchensRepository.create(kitchen)

    const { kitchen: updatedKitchen } = await sut.execute({
      id: kitchen.id,
      description: 'Cozinha Editada'
    })

    expect(updatedKitchen.description).toBe('Cozinha Editada')
    expect(kitchensRepository.items[0].description).toBe('Cozinha Editada')
  })
})

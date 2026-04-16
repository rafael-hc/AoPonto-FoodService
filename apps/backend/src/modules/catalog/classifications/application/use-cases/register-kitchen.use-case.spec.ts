import { InMemoryKitchensRepository } from '@/catalog/classifications/test/repositories/in-memory-kitchens-repository'
import { RegisterKitchenUseCase } from './register-kitchen.use-case'

let kitchensRepository: InMemoryKitchensRepository
let sut: RegisterKitchenUseCase

describe('Register Kitchen', () => {
  beforeEach(() => {
    kitchensRepository = new InMemoryKitchensRepository()
    sut = new RegisterKitchenUseCase(kitchensRepository)
  })

  it('should be able to register a kitchen', async () => {
    const { kitchen } = await sut.execute({
      description: 'Cozinha Central',
      ip: '192.168.0.1',
      port: '8080',
      printer: 'Impressora 1'
    })

    expect(kitchen.id).toBeTruthy()
    expect(kitchensRepository.items).toHaveLength(1)
    expect(kitchensRepository.items[0]).toEqual(kitchen)
  })
})

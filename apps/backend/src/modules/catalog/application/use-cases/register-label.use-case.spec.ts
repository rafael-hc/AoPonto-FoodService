import { InMemoryLabelsRepository } from '@/catalog/test/repositories/in-memory-labels-repository'
import { RegisterLabelUseCase } from './register-label.use-case'

let labelsRepository: InMemoryLabelsRepository
let sut: RegisterLabelUseCase

describe('Register Label', () => {
  beforeEach(() => {
    labelsRepository = new InMemoryLabelsRepository()
    sut = new RegisterLabelUseCase(labelsRepository)
  })

  it('should be able to register a label', async () => {
    const { label } = await sut.execute({
      description: 'L1',
      externalId: 'ext1'
    })

    expect(label.id).toBeTruthy()
    expect(labelsRepository.items).toHaveLength(1)
  })
})

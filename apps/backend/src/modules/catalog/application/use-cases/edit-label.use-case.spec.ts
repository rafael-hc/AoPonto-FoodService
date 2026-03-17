import { Label } from '@/catalog/domain/entities/label'
import { InMemoryLabelsRepository } from '@/catalog/test/repositories/in-memory-labels-repository'
import { EditLabelUseCase } from './edit-label.use-case'

let labelsRepository: InMemoryLabelsRepository
let sut: EditLabelUseCase

describe('Edit Label', () => {
  beforeEach(() => {
    labelsRepository = new InMemoryLabelsRepository()
    sut = new EditLabelUseCase(labelsRepository)
  })

  it('should be able to edit a label', async () => {
    const label = Label.create({
      code: 1,
      description: 'L1',
      externalId: 'ext1'
    })

    await labelsRepository.create(label)

    await sut.execute({
      id: label.id,
      description: 'L1 Editada'
    })

    expect(labelsRepository.items[0].description).toBe('L1 Editada')
  })
})

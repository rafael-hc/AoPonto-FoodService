import { Label } from '@/catalog/domain/entities/label'
import { InMemoryLabelsRepository } from '@/catalog/test/repositories/in-memory-labels-repository'
import { DeleteLabelUseCase } from './delete-label.use-case'

let labelsRepository: InMemoryLabelsRepository
let sut: DeleteLabelUseCase

describe('Delete Label', () => {
  beforeEach(() => {
    labelsRepository = new InMemoryLabelsRepository()
    sut = new DeleteLabelUseCase(labelsRepository)
  })

  it('should be able to delete a label', async () => {
    const label = Label.create({
      code: 1,
      description: 'L1',
      externalId: 'ext1'
    })

    await labelsRepository.create(label)

    await sut.execute({ id: label.id })

    expect(labelsRepository.items[0].deleteDate).toBeTruthy()
  })
})

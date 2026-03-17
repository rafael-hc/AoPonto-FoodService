import { Label } from '@/catalog/domain/entities/label'
import { InMemoryLabelsRepository } from '@/catalog/test/repositories/in-memory-labels-repository'
import { FetchLabelsUseCase } from './fetch-labels.use-case'

let labelsRepository: InMemoryLabelsRepository
let sut: FetchLabelsUseCase

describe('Fetch Labels', () => {
  beforeEach(() => {
    labelsRepository = new InMemoryLabelsRepository()
    sut = new FetchLabelsUseCase(labelsRepository)
  })

  it('should be able to fetch labels', async () => {
    await labelsRepository.create(
      Label.create({
        code: 1,
        description: 'L1',
        externalId: 'ext1'
      })
    )

    const { labels } = await sut.execute()

    expect(labels).toHaveLength(1)
  })
})

import { makeProductWizard } from '../../test/factories/make-product-wizard'
import { InMemoryProductWizardsRepository } from '../../test/repositories/in-memory-product-wizards-repository'
import { FetchProductWizardsUseCase } from './fetch-product-wizards.use-case'

let inMemoryProductWizardsRepository: InMemoryProductWizardsRepository
let sut: FetchProductWizardsUseCase

describe('Fetch Product Wizards', () => {
  beforeEach(() => {
    inMemoryProductWizardsRepository = new InMemoryProductWizardsRepository()
    sut = new FetchProductWizardsUseCase(inMemoryProductWizardsRepository)
  })

  it('should be able to fetch product wizards', async () => {
    const productId = 'product-1'

    await inMemoryProductWizardsRepository.create(
      makeProductWizard({
        productId,
        wizardQuestionId: 'q-2',
        order: 2
      })
    )

    await inMemoryProductWizardsRepository.create(
      makeProductWizard({
        productId,
        wizardQuestionId: 'q-1',
        order: 1
      })
    )

    // Outro produto para garantir o filtro
    await inMemoryProductWizardsRepository.create(
      makeProductWizard({
        productId: 'product-2',
        wizardQuestionId: 'q-3',
        order: 1
      })
    )

    const result = await sut.execute({
      productId
    })

    expect(result.productWizards).toHaveLength(2)
    expect(result.productWizards[0].order).toBe(1)
    expect(result.productWizards[1].order).toBe(2)
  })

  it('should return empty list when no wizards are linked', async () => {
    const result = await sut.execute({
      productId: 'non-existing-product'
    })

    expect(result.productWizards).toHaveLength(0)
  })
})

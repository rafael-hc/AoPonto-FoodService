import { InMemoryProductWizardsRepository } from '@/catalog/test/repositories/in-memory-product-wizards-repository'
import { SyncProductWizardsUseCase } from './sync-product-wizards.use-case'

let productWizardsRepository: InMemoryProductWizardsRepository
let sut: SyncProductWizardsUseCase

describe('Sync Product Wizards', () => {
  beforeEach(() => {
    productWizardsRepository = new InMemoryProductWizardsRepository()
    sut = new SyncProductWizardsUseCase(productWizardsRepository)
  })

  it('should be able to sync wizard links for a product', async () => {
    const productId = 'p1'

    await sut.execute({
      productId,
      wizards: [
        { wizardQuestionId: 'q1', order: 1 },
        { wizardQuestionId: 'q2', order: 2 }
      ]
    })

    expect(productWizardsRepository.items).toHaveLength(2)
    expect(productWizardsRepository.items[0].wizardQuestionId).toBe('q1')
    expect(productWizardsRepository.items[1].wizardQuestionId).toBe('q2')

    // Sincronizar novamente removendo um e adicionando outro
    await sut.execute({
      productId,
      wizards: [
        { wizardQuestionId: 'q1', order: 1 },
        { wizardQuestionId: 'q3', order: 2 }
      ]
    })

    expect(productWizardsRepository.items).toHaveLength(2)
    expect(
      productWizardsRepository.items.find((i) => i.wizardQuestionId === 'q2')
    ).toBeUndefined()
    expect(
      productWizardsRepository.items.find((i) => i.wizardQuestionId === 'q3')
    ).toBeTruthy()
  })
})

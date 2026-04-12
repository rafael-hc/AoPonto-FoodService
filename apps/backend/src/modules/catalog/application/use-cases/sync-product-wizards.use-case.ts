import { ProductWizard } from '@/catalog/domain/entities/product-wizard'
import { ProductWizardsRepository } from '@/catalog/domain/repositories/wizard-repositories'

interface SyncProductWizardsUseCaseRequest {
  productId: string
  wizards: {
    wizardQuestionId: string
    order: number
  }[]
}

export class SyncProductWizardsUseCase {
  constructor(private productWizardsRepository: ProductWizardsRepository) {}

  async execute({
    productId,
    wizards
  }: SyncProductWizardsUseCaseRequest): Promise<void> {
    // 1. Remover vínculos existentes para este produto
    await this.productWizardsRepository.deleteManyByProductId(productId)

    // 2. Criar novos vínculos
    const newWizards = wizards.map((w) =>
      ProductWizard.create({
        productId,
        wizardQuestionId: w.wizardQuestionId,
        order: w.order
      })
    )

    for (const wizard of newWizards) {
      await this.productWizardsRepository.create(wizard)
    }
  }
}

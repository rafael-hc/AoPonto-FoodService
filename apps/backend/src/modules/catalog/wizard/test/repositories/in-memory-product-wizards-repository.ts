import { ProductWizard } from '@/catalog/wizard/domain/entities/product-wizard'
import { ProductWizardsRepository } from '@/catalog/wizard/domain/repositories/wizard-repositories'

export class InMemoryProductWizardsRepository
  implements ProductWizardsRepository
{
  public items: ProductWizard[] = []

  async findById(id: string): Promise<ProductWizard | null> {
    const item = this.items.find((i) => i.id === id)
    return item || null
  }

  async findByProductId(productId: string): Promise<ProductWizard[]> {
    return this.items.filter((i) => i.productId === productId)
  }

  async create(productWizard: ProductWizard): Promise<void> {
    this.items.push(productWizard)
  }

  async save(productWizard: ProductWizard): Promise<void> {
    const index = this.items.findIndex((i) => i.id === productWizard.id)
    if (index >= 0) {
      this.items[index] = productWizard
    }
  }

  async delete(productWizard: ProductWizard): Promise<void> {
    const index = this.items.findIndex((i) => i.id === productWizard.id)
    if (index >= 0) {
      this.items.splice(index, 1)
    }
  }

  async deleteManyByProductId(productId: string): Promise<void> {
    this.items = this.items.filter((i) => i.productId !== productId)
  }
}

import { ProductType } from '@/catalog/domain/entities/product-type'
import { ProductTypesRepository } from '@/catalog/domain/repositories/product-types-repository'

export class InMemoryProductTypesRepository implements ProductTypesRepository {
  public items: ProductType[] = []

  async findById(id: string): Promise<ProductType | null> {
    const productType = this.items.find((item) => item.id === id)
    if (!productType) return null
    return productType
  }

  async findMany(): Promise<ProductType[]> {
    return this.items
  }

  async create(productType: ProductType): Promise<void> {
    this.items.push(productType)
  }

  async save(productType: ProductType): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === productType.id)
    if (itemIndex >= 0) {
      this.items[itemIndex] = productType
    }
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === id)
    if (itemIndex >= 0) {
      this.items.splice(itemIndex, 1)
    }
  }
}

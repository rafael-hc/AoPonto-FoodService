import { Product } from '@/catalog/products/domain/entities/product'
import { ProductsRepository } from '@/catalog/products/domain/repositories/products-repository'

export class InMemoryProductsRepository implements ProductsRepository {
  public items: Product[] = []

  async findById(id: string): Promise<Product | null> {
    const product = this.items.find((item) => item.id === id)
    if (!product) return null
    return product
  }

  async findByCode(code: number): Promise<Product | null> {
    const product = this.items.find((item) => item.code === code)
    if (!product) return null
    return product
  }

  async findMany(): Promise<Product[]> {
    return this.items
  }

  async create(product: Product): Promise<void> {
    this.items.push(product)
  }

  async save(product: Product): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === product.id)
    this.items[itemIndex] = product
  }

  async delete(product: Product): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === product.id)
    this.items.splice(itemIndex, 1)
  }
}

import { Product } from '@/catalog/products/domain/entities/product'

export abstract class ProductsRepository {
  abstract findById(id: string): Promise<Product | null>
  abstract findByCode(code: number): Promise<Product | null>
  abstract findMany(filter?: { productTypeId?: string }): Promise<Product[]>
  abstract create(product: Product): Promise<void>
  abstract save(product: Product): Promise<void>
  abstract delete(product: Product): Promise<void>
}

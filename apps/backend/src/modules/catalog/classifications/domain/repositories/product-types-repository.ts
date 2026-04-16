import { ProductType } from '@/catalog/classifications/domain/entities/product-type'

export abstract class ProductTypesRepository {
  abstract findById(id: string): Promise<ProductType | null>
  abstract findMany(): Promise<ProductType[]>
  abstract create(productType: ProductType): Promise<void>
  abstract save(productType: ProductType): Promise<void>
  abstract delete(id: string): Promise<void>
}

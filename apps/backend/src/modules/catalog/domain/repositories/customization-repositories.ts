import { ProductDetail } from '@/catalog/domain/entities/product-detail'
import { ProductPersonalized } from '@/catalog/domain/entities/product-personalized'
import { ProductSize } from '@/catalog/domain/entities/product-size'

export abstract class ProductPersonalizedRepository {
  abstract create(productPersonalized: ProductPersonalized): Promise<void>
  abstract save(productPersonalized: ProductPersonalized): Promise<void>
  abstract findById(id: string): Promise<ProductPersonalized | null>
  abstract findByCode(code: number): Promise<ProductPersonalized | null>
}

export abstract class ProductSizesRepository {
  abstract create(productSize: ProductSize): Promise<void>
  abstract save(productSize: ProductSize): Promise<void>
  abstract findById(id: string): Promise<ProductSize | null>
  abstract findByCode(code: number): Promise<ProductSize | null>
  abstract findByPersonalizedId(personalizedId: string): Promise<ProductSize[]>
}

export abstract class ProductDetailsRepository {
  abstract create(productDetail: ProductDetail): Promise<void>
  abstract save(productDetail: ProductDetail): Promise<void>
  abstract findById(id: string): Promise<ProductDetail | null>
  abstract findByCode(code: number): Promise<ProductDetail | null>
  abstract findByProductId(productId: string): Promise<ProductDetail[]>
}

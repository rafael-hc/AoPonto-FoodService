import { ProductType } from '@/catalog/domain/entities/product-type'

export const ProductTypePresenter = {
  toHTTP(productType: ProductType) {
    return {
      id: productType.id,
      description: productType.description,
      createdAt: productType.createdAt,
      updatedAt: productType.updatedAt
    }
  }
}

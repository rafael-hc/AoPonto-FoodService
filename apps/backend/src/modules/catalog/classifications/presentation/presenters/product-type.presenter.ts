import { ProductType } from '@/catalog/classifications/domain/entities/product-type'

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

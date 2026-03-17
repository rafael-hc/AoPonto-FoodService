import { Product } from '@/catalog/domain/entities/product'

export const ProductPresenter = {
  toHTTP(product: Product) {
    return {
      id: product.id,
      code: product.code,
      name: product.name,
      description: product.description,
      price: product.price,
      costPrice: product.costPrice,
      active: product.active,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }
  }
}

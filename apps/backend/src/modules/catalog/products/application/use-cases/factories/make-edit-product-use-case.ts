import { ProductsRepository } from '@/catalog/products/domain/repositories/products-repository'
import { EditProductUseCase } from '../edit-product.use-case'

export function makeEditProductUseCase(productsRepository: ProductsRepository) {
  return new EditProductUseCase(productsRepository)
}

import { ProductsRepository } from '@/catalog/domain/repositories/products-repository'
import { EditProductUseCase } from '../edit-product.use-case'

export function makeEditProductUseCase(productsRepository: ProductsRepository) {
  return new EditProductUseCase(productsRepository)
}

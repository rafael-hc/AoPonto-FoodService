import { ProductsRepository } from '@/catalog/domain/repositories/products-repository'
import { DeleteProductUseCase } from '../delete-product.use-case'

export function makeDeleteProductUseCase(
  productsRepository: ProductsRepository
) {
  return new DeleteProductUseCase(productsRepository)
}

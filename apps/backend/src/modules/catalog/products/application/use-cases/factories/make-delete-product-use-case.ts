import { ProductsRepository } from '@/catalog/products/domain/repositories/products-repository'
import { DeleteProductUseCase } from '../delete-product.use-case'

export function makeDeleteProductUseCase(
  productsRepository: ProductsRepository
) {
  return new DeleteProductUseCase(productsRepository)
}

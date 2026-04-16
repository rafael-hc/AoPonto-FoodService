import { ProductsRepository } from '@/catalog/products/domain/repositories/products-repository'
import { FetchProductsUseCase } from '../fetch-products.use-case'

export function makeFetchProductsUseCase(
  productsRepository: ProductsRepository
) {
  return new FetchProductsUseCase(productsRepository)
}

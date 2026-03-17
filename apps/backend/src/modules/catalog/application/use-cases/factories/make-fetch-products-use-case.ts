import { ProductsRepository } from '@/catalog/domain/repositories/products-repository'
import { FetchProductsUseCase } from '../fetch-products.use-case'

export function makeFetchProductsUseCase(
  productsRepository: ProductsRepository
) {
  return new FetchProductsUseCase(productsRepository)
}

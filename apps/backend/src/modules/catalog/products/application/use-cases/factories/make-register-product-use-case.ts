import { ProductsRepository } from '@/catalog/products/domain/repositories/products-repository'
import { RegisterProductUseCase } from '../register-product.use-case'

export function makeRegisterProductUseCase(
  productsRepository: ProductsRepository
) {
  return new RegisterProductUseCase(productsRepository)
}

import { ProductsRepository } from '@/catalog/domain/repositories/products-repository'
import { RegisterProductUseCase } from '../register-product.use-case'

export function makeRegisterProductUseCase(
  productsRepository: ProductsRepository
) {
  return new RegisterProductUseCase(productsRepository)
}

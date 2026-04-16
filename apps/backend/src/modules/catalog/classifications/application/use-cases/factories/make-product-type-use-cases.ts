import { ProductTypesRepository } from '@/catalog/classifications/domain/repositories/product-types-repository'
import { DeleteProductTypeUseCase } from '../delete-product-type.use-case'
import { EditProductTypeUseCase } from '../edit-product-type.use-case'
import { FetchProductTypesUseCase } from '../fetch-product-types.use-case'
import { RegisterProductTypeUseCase } from '../register-product-type.use-case'

export function makeRegisterProductTypeUseCase(
  productTypesRepository: ProductTypesRepository
) {
  return new RegisterProductTypeUseCase(productTypesRepository)
}

export function makeFetchProductTypesUseCase(
  productTypesRepository: ProductTypesRepository
) {
  return new FetchProductTypesUseCase(productTypesRepository)
}

export function makeEditProductTypeUseCase(
  productTypesRepository: ProductTypesRepository
) {
  return new EditProductTypeUseCase(productTypesRepository)
}

export function makeDeleteProductTypeUseCase(
  productTypesRepository: ProductTypesRepository
) {
  return new DeleteProductTypeUseCase(productTypesRepository)
}

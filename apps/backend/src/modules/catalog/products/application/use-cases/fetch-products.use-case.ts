import { Product } from '@/catalog/products/domain/entities/product'
import { ProductsRepository } from '@/catalog/products/domain/repositories/products-repository'

interface FetchProductsUseCaseResponse {
  products: Product[]
}

interface FetchProductsUseCaseRequest {
  productTypeId?: string
}

export class FetchProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(
    request?: FetchProductsUseCaseRequest
  ): Promise<FetchProductsUseCaseResponse> {
    const products = await this.productsRepository.findMany({
      productTypeId: request?.productTypeId
    })

    return { products }
  }
}

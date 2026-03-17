import { Product } from '@/catalog/domain/entities/product'
import { ProductsRepository } from '@/catalog/domain/repositories/products-repository'

interface FetchProductsUseCaseResponse {
  products: Product[]
}

export class FetchProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(): Promise<FetchProductsUseCaseResponse> {
    const products = await this.productsRepository.findMany()

    return { products }
  }
}

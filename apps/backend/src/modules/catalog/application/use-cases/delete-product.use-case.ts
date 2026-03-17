import { ProductsRepository } from '@/catalog/domain/repositories/products-repository'

interface DeleteProductUseCaseRequest {
  id: string
}

export class DeleteProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({ id }: DeleteProductUseCaseRequest): Promise<void> {
    const product = await this.productsRepository.findById(id)

    if (!product) {
      throw new Error('Product not found')
    }

    product.delete()

    await this.productsRepository.save(product)
  }
}

import { ProductsRepository } from '@/catalog/domain/repositories/products-repository'

interface EditProductUseCaseRequest {
  id: string
  name?: string
  price?: number
  description?: string
  costPrice?: number
  minStock?: number
  active?: boolean
}

export class EditProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({ id, ...data }: EditProductUseCaseRequest): Promise<void> {
    const product = await this.productsRepository.findById(id)

    if (!product) {
      throw new Error('Product not found')
    }

    product.updateDetails(data)

    await this.productsRepository.save(product)
  }
}

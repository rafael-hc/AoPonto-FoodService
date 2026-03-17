import { Product } from '@/catalog/domain/entities/product'
import { TaxMetadata } from '@/catalog/domain/entities/value-objects/product-tax-metadata'
import { ProductsRepository } from '@/catalog/domain/repositories/products-repository'

interface RegisterProductUseCaseRequest {
  code: number
  name: string
  price: number
  description?: string
  costPrice?: number
  minStock?: number
  unitId: string
  kitchenId?: string
  labelId: string
  productTypeId: string
}

interface RegisterProductUseCaseResponse {
  product: Product
}

export class RegisterProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    code,
    name,
    price,
    ...rest
  }: RegisterProductUseCaseRequest): Promise<RegisterProductUseCaseResponse> {
    const productWithSameCode = await this.productsRepository.findByCode(code)

    if (productWithSameCode) {
      throw new Error('Product with same code already exists')
    }

    const product = Product.create({
      code,
      name,
      price,
      ...rest,
      taxMetadata: TaxMetadata.create({})
    })

    await this.productsRepository.create(product)

    return { product }
  }
}

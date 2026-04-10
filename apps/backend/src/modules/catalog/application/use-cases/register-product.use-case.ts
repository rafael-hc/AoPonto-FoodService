import { Product } from '@/catalog/domain/entities/product'
import { TaxMetadata } from '@/catalog/domain/entities/value-objects/product-tax-metadata'
import { ProductsRepository } from '@/catalog/domain/repositories/products-repository'

interface RegisterProductUseCaseRequest {
  code?: number
  barcode?: string
  name: string
  price: number
  description?: string
  methodOfPreparation?: string
  costPrice?: number
  minStock?: number
  active?: boolean
  unitId: string
  kitchenId?: string | null
  labelId?: string
  productTypeId?: string
  isKitchenItem?: boolean
  useMobileComanda?: boolean
  useDigitalMenu?: boolean
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
    if (code) {
      const productWithSameCode = await this.productsRepository.findByCode(code)

      if (productWithSameCode) {
        throw new Error('Product with same code already exists')
      }
    }

    const product = Product.create({
      code,
      name,
      price,
      ...rest,
      productTypeId: rest.productTypeId as string,
      taxMetadata: TaxMetadata.create({
        barcode: rest.barcode
      })
    })

    await this.productsRepository.create(product)

    return { product }
  }
}

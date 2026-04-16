import { Product } from '@/catalog/products/domain/entities/product'
import { ProductsRepository } from '@/catalog/products/domain/repositories/products-repository'

interface EditProductUseCaseRequest {
  id: string
  name?: string
  barcode?: string
  price?: number
  description?: string
  methodOfPreparation?: string
  costPrice?: number
  minStock?: number
  active?: boolean
  discontinued?: boolean
  labelId?: string
  unitId?: string
  kitchenId?: string | null
  productTypeId?: string
  isKitchenItem?: boolean
  useMobileComanda?: boolean
  useDigitalMenu?: boolean
}

interface EditProductUseCaseResponse {
  product: Product
}

export class EditProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    id,
    ...data
  }: EditProductUseCaseRequest): Promise<EditProductUseCaseResponse> {
    const product = await this.productsRepository.findById(id)

    if (!product) {
      throw new Error('Product not found')
    }

    product.updateDetails(data)

    await this.productsRepository.save(product)

    return { product }
  }
}

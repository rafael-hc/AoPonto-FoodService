import { Injectable, NotFoundException } from '@nestjs/common'
import { ProductTypesRepository } from '@/catalog/domain/repositories/product-types-repository'

@Injectable()
export class EditProductTypeUseCase {
  constructor(private productTypesRepository: ProductTypesRepository) {}
  async execute(props: { id: string; description?: string }) {
    const productType = await this.productTypesRepository.findById(props.id)
    if (!productType)
      throw new NotFoundException('Tipo de produto não encontrado.')

    productType.updateDetails(props)
    await this.productTypesRepository.save(productType)
    return { productType }
  }
}

import { Injectable } from '@nestjs/common'
import { ProductType } from '@/catalog/domain/entities/product-type'
import { ProductTypesRepository } from '@/catalog/domain/repositories/product-types-repository'

@Injectable()
export class RegisterProductTypeUseCase {
  constructor(private productTypesRepository: ProductTypesRepository) {}

  async execute(props: { description: string }) {
    const productType = ProductType.create(props)
    await this.productTypesRepository.create(productType)
    return { productType }
  }
}

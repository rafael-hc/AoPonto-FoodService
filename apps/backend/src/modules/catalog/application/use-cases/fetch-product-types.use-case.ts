import { Injectable } from '@nestjs/common'
import { ProductTypesRepository } from '@/catalog/domain/repositories/product-types-repository'

@Injectable()
export class FetchProductTypesUseCase {
  constructor(private productTypesRepository: ProductTypesRepository) {}
  async execute() {
    const productTypes = await this.productTypesRepository.findMany()
    return { productTypes }
  }
}

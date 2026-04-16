import { Injectable, NotFoundException } from '@nestjs/common'
import { ProductTypesRepository } from '@/catalog/classifications/domain/repositories/product-types-repository'

@Injectable()
export class DeleteProductTypeUseCase {
  constructor(private productTypesRepository: ProductTypesRepository) {}
  async execute({ id }: { id: string }) {
    const productType = await this.productTypesRepository.findById(id)
    if (!productType)
      throw new NotFoundException('Tipo de produto não encontrado.')

    await this.productTypesRepository.delete(id)
  }
}

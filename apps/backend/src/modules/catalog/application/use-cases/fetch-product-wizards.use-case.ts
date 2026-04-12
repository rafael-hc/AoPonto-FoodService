import { Injectable } from '@nestjs/common'
import { ProductWizard } from '@/catalog/domain/entities/product-wizard'
import { ProductWizardsRepository } from '@/catalog/domain/repositories/wizard-repositories'

interface FetchProductWizardsUseCaseRequest {
  productId: string
}

interface FetchProductWizardsUseCaseResponse {
  productWizards: ProductWizard[]
}

@Injectable()
export class FetchProductWizardsUseCase {
  constructor(private productWizardsRepository: ProductWizardsRepository) {}

  async execute({
    productId
  }: FetchProductWizardsUseCaseRequest): Promise<FetchProductWizardsUseCaseResponse> {
    const productWizards =
      await this.productWizardsRepository.findByProductId(productId)

    // Ordenar por ordem definida
    const sortedWizards = productWizards.sort((a, b) => a.order - b.order)

    return {
      productWizards: sortedWizards
    }
  }
}

import { Injectable } from '@nestjs/common'
import { Kitchen } from '@/catalog/domain/entities/kitchen'
import { KitchensRepository } from '@/catalog/domain/repositories/kitchens-repository'

interface FetchKitchensUseCaseResponse {
  kitchens: Kitchen[]
}

@Injectable()
export class FetchKitchensUseCase {
  constructor(private kitchensRepository: KitchensRepository) {}

  async execute(): Promise<FetchKitchensUseCaseResponse> {
    const kitchens = await this.kitchensRepository.findMany()

    return {
      kitchens
    }
  }
}

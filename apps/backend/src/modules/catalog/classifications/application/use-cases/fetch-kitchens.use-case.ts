import { Injectable } from '@nestjs/common'
import { Kitchen } from '@/catalog/classifications/domain/entities/kitchen'
import { KitchensRepository } from '@/catalog/classifications/domain/repositories/kitchens-repository'

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

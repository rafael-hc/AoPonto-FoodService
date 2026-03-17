import { Injectable, NotFoundException } from '@nestjs/common'
import { Kitchen } from '@/catalog/domain/entities/kitchen'
import { KitchensRepository } from '@/catalog/domain/repositories/kitchens-repository'

interface EditKitchenUseCaseRequest {
  id: string
  description?: string
  ip?: string
  port?: string
  printer?: string
  versionReg?: number
  versionSync?: number
}

interface EditKitchenUseCaseResponse {
  kitchen: Kitchen
}

@Injectable()
export class EditKitchenUseCase {
  constructor(private kitchensRepository: KitchensRepository) {}

  async execute({
    id,
    ...props
  }: EditKitchenUseCaseRequest): Promise<EditKitchenUseCaseResponse> {
    const kitchen = await this.kitchensRepository.findById(id)

    if (!kitchen) {
      throw new NotFoundException('Cozinha não encontrada.')
    }

    kitchen.updateDetails(props)

    await this.kitchensRepository.save(kitchen)

    return {
      kitchen
    }
  }
}

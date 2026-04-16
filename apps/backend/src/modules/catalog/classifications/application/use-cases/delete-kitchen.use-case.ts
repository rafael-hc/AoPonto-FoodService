import { Injectable, NotFoundException } from '@nestjs/common'
import { KitchensRepository } from '@/catalog/classifications/domain/repositories/kitchens-repository'

interface DeleteKitchenUseCaseRequest {
  id: string
}

@Injectable()
export class DeleteKitchenUseCase {
  constructor(private kitchensRepository: KitchensRepository) {}

  async execute({ id }: DeleteKitchenUseCaseRequest): Promise<void> {
    const kitchen = await this.kitchensRepository.findById(id)

    if (!kitchen) {
      throw new NotFoundException('Cozinha não encontrada.')
    }

    // Como no schema Prisma não temos soft delete para Kitchen ainda, vamos assumir que o repositório terá um método delete físico.
    await this.kitchensRepository.delete(id)
  }
}

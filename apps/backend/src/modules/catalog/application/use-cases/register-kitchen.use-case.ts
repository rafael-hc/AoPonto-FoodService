import { Injectable } from '@nestjs/common'
import { Kitchen } from '@/catalog/domain/entities/kitchen'
import { KitchensRepository } from '@/catalog/domain/repositories/kitchens-repository'

interface RegisterKitchenUseCaseRequest {
  description: string
  ip: string
  port: string
  printer: string
  versionReg?: number
  versionSync?: number
}

interface RegisterKitchenUseCaseResponse {
  kitchen: Kitchen
}

@Injectable()
export class RegisterKitchenUseCase {
  constructor(private kitchensRepository: KitchensRepository) {}

  async execute({
    description,
    ip,
    port,
    printer,
    versionReg,
    versionSync
  }: RegisterKitchenUseCaseRequest): Promise<RegisterKitchenUseCaseResponse> {
    const kitchen = Kitchen.create({
      description,
      ip,
      port,
      printer,
      versionReg,
      versionSync
    })

    await this.kitchensRepository.create(kitchen)

    return {
      kitchen
    }
  }
}

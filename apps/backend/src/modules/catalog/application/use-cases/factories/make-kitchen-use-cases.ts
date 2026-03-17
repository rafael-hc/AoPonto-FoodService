import { KitchensRepository } from '@/catalog/domain/repositories/kitchens-repository'
import { DeleteKitchenUseCase } from '../delete-kitchen.use-case'
import { EditKitchenUseCase } from '../edit-kitchen.use-case'
import { FetchKitchensUseCase } from '../fetch-kitchens.use-case'
import { RegisterKitchenUseCase } from '../register-kitchen.use-case'

export function makeRegisterKitchenUseCase(
  kitchensRepository: KitchensRepository
) {
  return new RegisterKitchenUseCase(kitchensRepository)
}

export function makeFetchKitchensUseCase(
  kitchensRepository: KitchensRepository
) {
  return new FetchKitchensUseCase(kitchensRepository)
}

export function makeEditKitchenUseCase(kitchensRepository: KitchensRepository) {
  return new EditKitchenUseCase(kitchensRepository)
}

export function makeDeleteKitchenUseCase(
  kitchensRepository: KitchensRepository
) {
  return new DeleteKitchenUseCase(kitchensRepository)
}

import { ProductWizardsRepository } from '@/catalog/wizard/domain/repositories/wizard-repositories'
import { FetchProductWizardsUseCase } from '../fetch-product-wizards.use-case'
import { SyncProductWizardsUseCase } from '../sync-product-wizards.use-case'

export function makeSyncProductWizardsUseCase(
  repository: ProductWizardsRepository
) {
  return new SyncProductWizardsUseCase(repository)
}

export function makeFetchProductWizardsUseCase(
  repository: ProductWizardsRepository
) {
  return new FetchProductWizardsUseCase(repository)
}

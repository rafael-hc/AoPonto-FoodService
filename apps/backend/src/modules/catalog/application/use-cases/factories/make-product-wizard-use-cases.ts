import { ProductWizardsRepository } from '@/catalog/domain/repositories/wizard-repositories'
import { SyncProductWizardsUseCase } from '../sync-product-wizards.use-case'
import { FetchProductWizardsUseCase } from '../fetch-product-wizards.use-case'

export function makeSyncProductWizardsUseCase(repository: ProductWizardsRepository) {
  return new SyncProductWizardsUseCase(repository)
}

export function makeFetchProductWizardsUseCase(repository: ProductWizardsRepository) {
  return new FetchProductWizardsUseCase(repository)
}

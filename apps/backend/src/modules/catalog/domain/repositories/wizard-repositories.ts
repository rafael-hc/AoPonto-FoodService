import { ProductWizard } from '@/catalog/domain/entities/product-wizard'
import { WizardQuestion } from '@/catalog/domain/entities/wizard-question'

export abstract class WizardQuestionsRepository {
  abstract findById(id: string): Promise<WizardQuestion | null>
  abstract findByCode(code: number): Promise<WizardQuestion | null>
  abstract findMany(params?: { search?: string }): Promise<WizardQuestion[]>
  abstract create(wizardQuestion: WizardQuestion): Promise<void>
  abstract save(wizardQuestion: WizardQuestion): Promise<void>
  abstract delete(wizardQuestion: WizardQuestion): Promise<void>
}

export abstract class ProductWizardsRepository {
  abstract findById(id: string): Promise<ProductWizard | null>
  abstract findByProductId(productId: string): Promise<ProductWizard[]>
  abstract create(productWizard: ProductWizard): Promise<void>
  abstract save(productWizard: ProductWizard): Promise<void>
  abstract delete(productWizard: ProductWizard): Promise<void>
  abstract deleteManyByProductId(productId: string): Promise<void>
}

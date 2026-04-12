import { ProductWizard, ProductWizardProps } from '@/catalog/domain/entities/product-wizard'

export function makeProductWizard(
  override: Partial<ProductWizardProps> = {}
) {
  const productWizard = ProductWizard.create({
    productId: 'default-product-id',
    wizardQuestionId: 'default-question-id',
    order: 0,
    ...override
  })

  return productWizard
}

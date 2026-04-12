import { ProductWizard } from '@/catalog/domain/entities/product-wizard'
import { WizardQuestionPresenter } from './wizard-question.presenter'

export const ProductWizardPresenter = {
  toHTTP(productWizard: ProductWizard) {
    return {
      id: productWizard.id,
      productId: productWizard.productId,
      wizardQuestionId: productWizard.wizardQuestionId,
      order: productWizard.order,
      // Incluímos a pergunta se ela estiver carregada para facilitar o frontend
      wizardQuestion: productWizard.wizardQuestion
        ? WizardQuestionPresenter.toHTTP(productWizard.wizardQuestion)
        : undefined
    }
  }
}

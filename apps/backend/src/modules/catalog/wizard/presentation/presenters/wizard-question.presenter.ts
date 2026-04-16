import { WizardQuestion } from '@/catalog/wizard/domain/entities/wizard-question'

export const WizardQuestionPresenter = {
  toHTTP(wizardQuestion: WizardQuestion) {
    return {
      id: wizardQuestion.id,
      internalCode: wizardQuestion.internalCode,
      description: wizardQuestion.description,
      minResponses: wizardQuestion.minResponses,
      maxResponses: wizardQuestion.maxResponses,
      minItems: wizardQuestion.minItems,
      maxItems: wizardQuestion.maxItems,
      options: wizardQuestion.options?.map((opt) => ({
        id: opt.id,
        description: opt.description,
        productId: opt.productId,
        promoPrice: opt.promoPrice,
        maxQty: opt.maxQty
      })),
      createdAt: wizardQuestion.createdAt,
      updatedAt: wizardQuestion.updatedAt
    }
  }
}

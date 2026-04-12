import {
  WizardQuestion,
  WizardQuestionProps
} from '@/catalog/domain/entities/wizard-question'

export function makeWizardQuestion(
  override: Partial<WizardQuestionProps> = {},
  id?: string
) {
  const wizardQuestion = WizardQuestion.create({
    description: 'Default Question Description',
    context: 'PRODUCT',
    minResponses: 1,
    maxResponses: 1,
    minItems: 1,
    maxItems: 1,
    ...override,
    id: id ?? override.id
  })

  return wizardQuestion
}

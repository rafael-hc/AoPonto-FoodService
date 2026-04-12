import { WizardOption } from '@/catalog/domain/entities/wizard-option'
import { WizardQuestion } from '@/catalog/domain/entities/wizard-question'
import { WizardQuestionsRepository } from '@/catalog/domain/repositories/wizard-repositories'

interface SynchronizeWizardQuestionUseCaseRequest {
  id?: string
  description: string
  context: 'PRODUCT' | 'COMBO'
  minResponses: number
  maxResponses: number
  minItems: number
  maxItems: number
  options: {
    id?: string
    productId?: string | null
    description: string
    promoPrice?: number | null
    maxQty: number
  }[]
}

interface SynchronizeWizardQuestionUseCaseResponse {
  wizardQuestion: WizardQuestion
}

export class SynchronizeWizardQuestionUseCase {
  constructor(private wizardQuestionsRepository: WizardQuestionsRepository) {}

  async execute(
    request: SynchronizeWizardQuestionUseCaseRequest
  ): Promise<SynchronizeWizardQuestionUseCaseResponse> {
    let wizardQuestion: WizardQuestion | null = null

    if (request.id) {
      wizardQuestion = await this.wizardQuestionsRepository.findById(request.id)
    }

    if (wizardQuestion) {
      // Atualizar existente
      wizardQuestion.update({
        description: request.description,
        context: request.context,
        minResponses: request.minResponses,
        maxResponses: request.maxResponses,
        minItems: request.minItems,
        maxItems: request.maxItems
      })
    } else {
      // Criar nova
      wizardQuestion = WizardQuestion.create({
        description: request.description,
        context: request.context,
        minResponses: request.minResponses,
        maxResponses: request.maxResponses,
        minItems: request.minItems,
        maxItems: request.maxItems
      })
    }

    if (!wizardQuestion) {
      throw new Error('Question not found or could not be created')
    }

    // Mapear opções
    const options = request.options.map((opt) =>
      WizardOption.create({
        id: opt.id,
        wizardQuestionId: wizardQuestion.id,
        productId: opt.productId,
        description: opt.description,
        promoPrice: opt.promoPrice,
        maxQty: opt.maxQty
      })
    )

    wizardQuestion.setOptions(options)

    if (request.id) {
      await this.wizardQuestionsRepository.save(wizardQuestion)
    } else {
      await this.wizardQuestionsRepository.create(wizardQuestion)
    }

    return { wizardQuestion }
  }
}

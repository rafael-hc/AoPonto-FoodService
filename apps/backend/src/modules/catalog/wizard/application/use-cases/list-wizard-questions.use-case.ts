import { WizardQuestion } from '@/catalog/wizard/domain/entities/wizard-question'
import { WizardQuestionsRepository } from '@/catalog/wizard/domain/repositories/wizard-repositories'

interface ListWizardQuestionsUseCaseRequest {
  search?: string
}

interface ListWizardQuestionsUseCaseResponse {
  wizardQuestions: WizardQuestion[]
}

export class ListWizardQuestionsUseCase {
  constructor(private wizardQuestionsRepository: WizardQuestionsRepository) {}

  async execute(
    request: ListWizardQuestionsUseCaseRequest
  ): Promise<ListWizardQuestionsUseCaseResponse> {
    const wizardQuestions = await this.wizardQuestionsRepository.findMany({
      search: request.search
    })

    return { wizardQuestions }
  }
}

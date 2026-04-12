import { WizardQuestion } from '@/catalog/domain/entities/wizard-question'
import { WizardQuestionsRepository } from '@/catalog/domain/repositories/wizard-repositories'

interface GetWizardQuestionUseCaseRequest {
  id: string
}

interface GetWizardQuestionUseCaseResponse {
  wizardQuestion: WizardQuestion
}

export class GetWizardQuestionUseCase {
  constructor(private wizardQuestionsRepository: WizardQuestionsRepository) {}

  async execute({
    id
  }: GetWizardQuestionUseCaseRequest): Promise<GetWizardQuestionUseCaseResponse> {
    const wizardQuestion = await this.wizardQuestionsRepository.findById(id)

    if (!wizardQuestion) {
      throw new Error('Wizard question not found')
    }

    return { wizardQuestion }
  }
}

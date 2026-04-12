import { WizardQuestionsRepository } from '@/catalog/domain/repositories/wizard-repositories'

interface DeleteWizardQuestionUseCaseRequest {
  id: string
}

export class DeleteWizardQuestionUseCase {
  constructor(private wizardQuestionsRepository: WizardQuestionsRepository) {}

  async execute({ id }: DeleteWizardQuestionUseCaseRequest): Promise<void> {
    const wizardQuestion = await this.wizardQuestionsRepository.findById(id)

    if (!wizardQuestion) {
      throw new Error('Wizard question not found')
    }

    await this.wizardQuestionsRepository.delete(wizardQuestion)
  }
}

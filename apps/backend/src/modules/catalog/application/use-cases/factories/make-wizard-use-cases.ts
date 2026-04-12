import { WizardQuestionsRepository } from '@/catalog/domain/repositories/wizard-repositories'
import { SynchronizeWizardQuestionUseCase } from '../synchronize-wizard-question.use-case'
import { ListWizardQuestionsUseCase } from '../list-wizard-questions.use-case'
import { GetWizardQuestionUseCase } from '../get-wizard-question.use-case'
import { DeleteWizardQuestionUseCase } from '../delete-wizard-question.use-case'

export function makeSynchronizeWizardQuestionUseCase(repository: WizardQuestionsRepository) {
  return new SynchronizeWizardQuestionUseCase(repository)
}

export function makeListWizardQuestionsUseCase(repository: WizardQuestionsRepository) {
  return new ListWizardQuestionsUseCase(repository)
}

export function makeGetWizardQuestionUseCase(repository: WizardQuestionsRepository) {
  return new GetWizardQuestionUseCase(repository)
}

export function makeDeleteWizardQuestionUseCase(repository: WizardQuestionsRepository) {
  return new DeleteWizardQuestionUseCase(repository)
}

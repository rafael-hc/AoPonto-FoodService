import { InMemoryWizardQuestionsRepository } from '@/catalog/test/repositories/in-memory-wizard-questions-repository'
import { DeleteWizardQuestionUseCase } from './delete-wizard-question.use-case'
import { WizardQuestion } from '@/catalog/domain/entities/wizard-question'

let wizardQuestionsRepository: InMemoryWizardQuestionsRepository
let sut: DeleteWizardQuestionUseCase

describe('Delete Wizard Question', () => {
  beforeEach(() => {
    wizardQuestionsRepository = new InMemoryWizardQuestionsRepository()
    sut = new DeleteWizardQuestionUseCase(wizardQuestionsRepository)
  })

  it('should be able to soft delete a wizard question', async () => {
    const question = WizardQuestion.create({ description: 'To delete', minResponses: 0, maxResponses: 1, minItems: 0, maxItems: 1 })
    await wizardQuestionsRepository.create(question)

    await sut.execute({ id: question.id })

    expect(wizardQuestionsRepository.items[0].deletedAt).toBeTruthy()
  })

  it('should throw error if wizard question does not exist', async () => {
    await expect(sut.execute({ id: 'non-existing' }))
      .rejects.toThrow('Wizard question not found')
  })
})

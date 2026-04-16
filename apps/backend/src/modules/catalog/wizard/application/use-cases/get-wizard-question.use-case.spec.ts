import { WizardQuestion } from '@/catalog/wizard/domain/entities/wizard-question'
import { InMemoryWizardQuestionsRepository } from '@/catalog/wizard/test/repositories/in-memory-wizard-questions-repository'
import { GetWizardQuestionUseCase } from './get-wizard-question.use-case'

let wizardQuestionsRepository: InMemoryWizardQuestionsRepository
let sut: GetWizardQuestionUseCase

describe('Get Wizard Question', () => {
  beforeEach(() => {
    wizardQuestionsRepository = new InMemoryWizardQuestionsRepository()
    sut = new GetWizardQuestionUseCase(wizardQuestionsRepository)
  })

  it('should be able to get a wizard question by id', async () => {
    const question = WizardQuestion.create({
      description: 'Test',
      minResponses: 0,
      maxResponses: 1,
      minItems: 0,
      maxItems: 1
    })
    await wizardQuestionsRepository.create(question)

    const result = await sut.execute({ id: question.id })

    expect(result.wizardQuestion.id).toBe(question.id)
    expect(result.wizardQuestion.description).toBe('Test')
  })

  it('should throw error if wizard question does not exist', async () => {
    await expect(sut.execute({ id: 'non-existing' })).rejects.toThrow(
      'Wizard question not found'
    )
  })
})

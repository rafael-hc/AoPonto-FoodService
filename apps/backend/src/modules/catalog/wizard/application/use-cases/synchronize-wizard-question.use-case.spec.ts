import { InMemoryWizardQuestionsRepository } from '../../test/repositories/in-memory-wizard-questions-repository'
import { SynchronizeWizardQuestionUseCase } from './synchronize-wizard-question.use-case'

let wizardQuestionsRepository: InMemoryWizardQuestionsRepository
let sut: SynchronizeWizardQuestionUseCase

describe('Synchronize Wizard Question', () => {
  beforeEach(() => {
    wizardQuestionsRepository = new InMemoryWizardQuestionsRepository()
    sut = new SynchronizeWizardQuestionUseCase(wizardQuestionsRepository)
  })

  it('should be able to create a new wizard question with options', async () => {
    const { wizardQuestion } = await sut.execute({
      description: 'Which drink?',
      context: 'COMBO',
      minResponses: 1,
      maxResponses: 1,
      minItems: 1,
      maxItems: 1,
      options: [
        { description: 'Coke', maxQty: 1 },
        { description: 'Pepsi', maxQty: 1 }
      ]
    })

    expect(wizardQuestion.id).toBeTruthy()
    expect(wizardQuestion.context).toBe('COMBO')
    expect(wizardQuestionsRepository.items).toHaveLength(1)
    expect(wizardQuestionsRepository.items[0].options).toHaveLength(2)
  })

  it('should be able to update an existing wizard question', async () => {
    const initialQuestion = await sut.execute({
      description: 'Initial',
      context: 'PRODUCT',
      minResponses: 0,
      maxResponses: 1,
      minItems: 0,
      maxItems: 1,
      options: [{ description: 'Opt 1', maxQty: 1 }]
    })

    const questionId = initialQuestion.wizardQuestion.id
    const optionId = initialQuestion.wizardQuestion.options?.[0].id

    const { wizardQuestion } = await sut.execute({
      id: questionId,
      description: 'Updated',
      context: 'PRODUCT',
      minResponses: 1,
      maxResponses: 1,
      minItems: 1,
      maxItems: 1,
      options: [
        { id: optionId, description: 'Opt 1 Updated', maxQty: 2 },
        { description: 'New Opt', maxQty: 1 }
      ]
    })

    expect(wizardQuestion.description).toBe('Updated')
    expect(wizardQuestion.options).toHaveLength(2)
    expect(wizardQuestion.options?.[0].description).toBe('Opt 1 Updated')
  })
})

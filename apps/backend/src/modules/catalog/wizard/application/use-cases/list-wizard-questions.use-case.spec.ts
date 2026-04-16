import { WizardQuestion } from '@/catalog/wizard/domain/entities/wizard-question'
import { InMemoryWizardQuestionsRepository } from '@/catalog/wizard/test/repositories/in-memory-wizard-questions-repository'
import { ListWizardQuestionsUseCase } from './list-wizard-questions.use-case'

let wizardQuestionsRepository: InMemoryWizardQuestionsRepository
let sut: ListWizardQuestionsUseCase

describe('List Wizard Questions', () => {
  beforeEach(() => {
    wizardQuestionsRepository = new InMemoryWizardQuestionsRepository()
    sut = new ListWizardQuestionsUseCase(wizardQuestionsRepository)
  })

  it('should be able to list wizard questions', async () => {
    await wizardQuestionsRepository.create(
      WizardQuestion.create({
        description: 'Q1',
        minResponses: 0,
        maxResponses: 1,
        minItems: 0,
        maxItems: 1
      })
    )
    await wizardQuestionsRepository.create(
      WizardQuestion.create({
        description: 'Q2',
        minResponses: 0,
        maxResponses: 1,
        minItems: 0,
        maxItems: 1
      })
    )

    const { wizardQuestions } = await sut.execute({})

    expect(wizardQuestions).toHaveLength(2)
  })

  it('should be able to filter wizard questions by search term', async () => {
    await wizardQuestionsRepository.create(
      WizardQuestion.create({
        description: 'Drinks',
        minResponses: 0,
        maxResponses: 1,
        minItems: 0,
        maxItems: 1
      })
    )
    await wizardQuestionsRepository.create(
      WizardQuestion.create({
        description: 'Sauces',
        minResponses: 0,
        maxResponses: 1,
        minItems: 0,
        maxItems: 1
      })
    )

    const { wizardQuestions } = await sut.execute({ search: 'drink' })

    expect(wizardQuestions).toHaveLength(1)
    expect(wizardQuestions[0].description).toBe('Drinks')
  })
})

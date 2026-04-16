import { Test, TestingModule } from '@nestjs/testing'
import { DeleteWizardQuestionUseCase } from '@/catalog/wizard/application/use-cases/delete-wizard-question.use-case'
import { GetWizardQuestionUseCase } from '@/catalog/wizard/application/use-cases/get-wizard-question.use-case'
import { ListWizardQuestionsUseCase } from '@/catalog/wizard/application/use-cases/list-wizard-questions.use-case'
import { SynchronizeWizardQuestionUseCase } from '@/catalog/wizard/application/use-cases/synchronize-wizard-question.use-case'
import { WizardQuestion } from '@/catalog/wizard/domain/entities/wizard-question'
import { WizardQuestionsController } from './wizard-questions.controller'

describe('WizardQuestionsController', () => {
  let controller: WizardQuestionsController
  let listWizardQuestions: ListWizardQuestionsUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WizardQuestionsController],
      providers: [
        {
          provide: SynchronizeWizardQuestionUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: ListWizardQuestionsUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: GetWizardQuestionUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: DeleteWizardQuestionUseCase,
          useValue: { execute: jest.fn() }
        }
      ]
    }).compile()

    controller = module.get<WizardQuestionsController>(
      WizardQuestionsController
    )
    listWizardQuestions = module.get<ListWizardQuestionsUseCase>(
      ListWizardQuestionsUseCase
    )
  })

  it('should list wizard questions', async () => {
    const question = WizardQuestion.create({
      description: 'Q1',
      context: 'PRODUCT',
      minResponses: 1,
      maxResponses: 1,
      minItems: 1,
      maxItems: 1
    })

    jest
      .spyOn(listWizardQuestions, 'execute')
      .mockResolvedValue({ wizardQuestions: [question] })

    const result = await controller.list()

    expect(result.wizardQuestions).toHaveLength(1)
  })
})

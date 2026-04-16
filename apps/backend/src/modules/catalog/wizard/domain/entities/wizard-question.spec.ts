import { WizardOption } from './wizard-option'
import { WizardQuestion } from './wizard-question'

describe('WizardQuestion Entity', () => {
  it('should be able to create a new wizard question', () => {
    const question = WizardQuestion.create({
      description: 'Which beverage?',
      minResponses: 1,
      maxResponses: 1,
      minItems: 1,
      maxItems: 1
    })

    expect(question.id).toBeTruthy()
    expect(question.description).toBe('Which beverage?')
  })

  describe('Validation Logic', () => {
    const question = WizardQuestion.create({
      description: 'Test Question',
      minResponses: 1,
      maxResponses: 2,
      minItems: 2,
      maxItems: 4
    })

    it('should fail if total responses is less than minResponses', () => {
      const result = question.validateSelection([])
      expect(result.isValid).toBe(false)
      expect(result.message).toContain('Selecione pelo menos 1 opção(ões)')
    })

    it('should fail if total responses exceeds maxResponses', () => {
      const result = question.validateSelection([
        { optionId: '1', quantity: 1 },
        { optionId: '2', quantity: 1 },
        { optionId: '3', quantity: 1 }
      ])
      expect(result.isValid).toBe(false)
      expect(result.message).toContain('Selecione no máximo 2 opção(ões)')
    })

    it('should fail if total items is less than minItems', () => {
      const result = question.validateSelection([
        { optionId: '1', quantity: 1 }
      ])
      expect(result.isValid).toBe(false)
      expect(result.message).toContain(
        'A quantidade total deve ser pelo menos 2'
      )
    })

    it('should fail if total items exceeds maxItems', () => {
      const result = question.validateSelection([
        { optionId: '1', quantity: 3 },
        { optionId: '2', quantity: 2 }
      ])
      expect(result.isValid).toBe(false)
      expect(result.message).toContain(
        'A quantidade total deve ser no máximo 4'
      )
    })

    it('should pass if selection is valid', () => {
      const result = question.validateSelection([
        { optionId: '1', quantity: 2 },
        { optionId: '2', quantity: 1 }
      ])
      expect(result.isValid).toBe(true)
    })

    it('should validate individual option max quantity', () => {
      const opt1 = WizardOption.create({
        id: 'opt1',
        wizardQuestionId: 'q1',
        maxQty: 2,
        description: 'Bacon'
      })

      const qWithOpts = WizardQuestion.create({
        description: 'With options',
        minResponses: 0,
        maxResponses: 0,
        minItems: 0,
        maxItems: 10,
        options: [opt1]
      })

      const result = qWithOpts.validateSelection([
        { optionId: 'opt1', quantity: 3 }
      ])

      expect(result.isValid).toBe(false)
      expect(result.message).toContain('excede o limite de 2')
    })
  })
})

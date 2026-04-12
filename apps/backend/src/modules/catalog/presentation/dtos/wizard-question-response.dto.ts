import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const wizardOptionResponseSchema = z.strictObject({
  id: z.uuid(),
  description: z.string(),
  productId: z.uuid().nullable().optional(),
  promoPrice: z.coerce.number().nullable().optional(),
  maxQty: z.number()
})

export const wizardQuestionResponseSchema = z.strictObject({
  id: z.uuid(),
  internalCode: z.number().optional().nullable(),
  description: z.string(),
  context: z.enum(['PRODUCT', 'COMBO']),
  minResponses: z.number(),
  maxResponses: z.number(),
  minItems: z.number(),
  maxItems: z.number(),
  options: z.array(wizardOptionResponseSchema).optional(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime()
})

export class WizardQuestionItemResponseDto extends createZodDto(
  wizardQuestionResponseSchema
) {}

export class SingleWizardQuestionResponseDto extends createZodDto(
  z.object({
    wizardQuestion: wizardQuestionResponseSchema
  })
) {}

export class FetchWizardQuestionsResponseDto extends createZodDto(
  z.object({
    wizardQuestions: z.array(wizardQuestionResponseSchema)
  })
) {}

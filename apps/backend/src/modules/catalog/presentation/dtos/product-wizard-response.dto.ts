import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'
import { wizardQuestionResponseSchema } from './wizard-question-response.dto'

export const productWizardResponseSchema = z.strictObject({
  id: z.uuid(),
  productId: z.uuid(),
  wizardQuestionId: z.uuid(),
  order: z.number(),
  wizardQuestion: wizardQuestionResponseSchema.optional()
})

export class ProductWizardResponseDto extends createZodDto(
  productWizardResponseSchema
) {}

export class FetchProductWizardsResponseDto extends createZodDto(
  z.object({
    productWizards: z.array(productWizardResponseSchema)
  })
) {}

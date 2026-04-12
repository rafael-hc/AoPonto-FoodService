import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const synchronizeWizardQuestionSchema = z.object({
  id: z.uuid({ error: 'ID inválido' }).optional(),
  description: z.string().min(1, { error: 'A descrição é obrigatória' }),
  context: z.enum(['PRODUCT', 'COMBO']).optional().default('PRODUCT'),
  minResponses: z.number().int().min(0),
  maxResponses: z.number().int().min(0),
  minItems: z.number().min(0),
  maxItems: z.number().min(0),
  options: z
    .array(
      z.object({
        id: z.uuid().optional(),
        productId: z.uuid().optional().nullable(),
        description: z
          .string()
          .min(1, { error: 'A descrição da opção é obrigatória' }),
        promoPrice: z.number().optional().nullable(),
        maxQty: z.number().min(1)
      })
    )
    .min(1, { error: 'A pergunta deve ter pelo menos uma opção' })
})

export class SynchronizeWizardQuestionDto extends createZodDto(
  synchronizeWizardQuestionSchema
) {}

import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const syncProductWizardsSchema = z.object({
  productId: z.uuid({ error: 'ID de produto inválido' }),
  wizards: z.array(
    z.object({
      wizardQuestionId: z.uuid({ error: 'ID de pergunta inválido' }),
      order: z.number().int().min(0)
    })
  )
})

export class SyncProductWizardsDto extends createZodDto(
  syncProductWizardsSchema
) {}

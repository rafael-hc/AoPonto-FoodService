import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const editProductTypeSchema = z.object({
  description: z
    .string()
    .min(1, { error: 'Descrição não pode ser vazia' })
    .optional()
})

export class EditProductTypeDto extends createZodDto(editProductTypeSchema) {}

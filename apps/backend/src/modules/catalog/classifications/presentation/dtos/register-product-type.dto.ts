import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const registerProductTypeSchema = z.object({
  description: z
    .string({ error: 'Descrição é obrigatória' })
    .min(1, { error: 'Descrição não pode ser vazia' })
})

export class RegisterProductTypeDto extends createZodDto(
  registerProductTypeSchema
) {}

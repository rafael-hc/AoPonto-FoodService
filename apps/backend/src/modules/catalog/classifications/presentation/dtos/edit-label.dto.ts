import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const editLabelSchema = z.object({
  description: z
    .string()
    .min(1, { error: 'Descrição não pode ser vazia' })
    .optional(),
  order: z.number().optional(),
  type: z.string().optional(),
  versionReg: z.number().optional(),
  versionSync: z.number().optional()
})

export class EditLabelDto extends createZodDto(editLabelSchema) {}

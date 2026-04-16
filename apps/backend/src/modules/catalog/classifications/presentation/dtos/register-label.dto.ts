import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const registerLabelSchema = z.object({
  description: z
    .string({ error: 'Descrição é obrigatória' })
    .min(1, { error: 'Descrição não pode ser vazia' }),
  order: z.number().optional(),
  type: z.string().optional(),
  externalId: z.string({ error: 'ID Externo/GUID é obrigatório' }),
  versionReg: z.number().optional(),
  versionSync: z.number().optional()
})

export class RegisterLabelDto extends createZodDto(registerLabelSchema) {}

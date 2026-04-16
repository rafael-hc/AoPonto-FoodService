import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const registerKitchenSchema = z.object({
  description: z
    .string({ error: 'Descrição é obrigatória' })
    .min(1, { error: 'Descrição não pode ser vazia' }),
  ip: z.ipv4({ error: 'IP inválido' }),
  port: z.string({ error: 'Porta é obrigatória' }),
  printer: z.string({ error: 'Impressora é obrigatória' }),
  versionReg: z.number().optional(),
  versionSync: z.number().optional()
})

export class RegisterKitchenDto extends createZodDto(registerKitchenSchema) {}

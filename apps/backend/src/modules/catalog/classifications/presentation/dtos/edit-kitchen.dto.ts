import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const editKitchenSchema = z.object({
  description: z
    .string()
    .min(1, { error: 'Descrição não pode ser vazia' })
    .optional(),
  ip: z.ipv4({ error: 'IP inválido' }).optional(),
  port: z.string().optional(),
  printer: z.string().optional(),
  versionReg: z.number().optional(),
  versionSync: z.number().optional()
})

export class EditKitchenDto extends createZodDto(editKitchenSchema) {}

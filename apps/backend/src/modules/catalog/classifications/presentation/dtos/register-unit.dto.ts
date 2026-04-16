import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const registerUnitSchema = z.object({
  initials: z
    .string({ error: 'Sigla é obrigatória' })
    .min(1, { error: 'Sigla não pode ser vazia' }),
  description: z.string().optional()
})

export class RegisterUnitDto extends createZodDto(registerUnitSchema) {}

import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const editUnitSchema = z.object({
  initials: z.string().min(1, { error: 'Sigla não pode ser vazia' }).optional(),
  description: z.string().optional().nullable()
})

export class EditUnitDto extends createZodDto(editUnitSchema) {}

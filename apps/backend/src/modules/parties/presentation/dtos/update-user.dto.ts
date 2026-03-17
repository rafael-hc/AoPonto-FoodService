import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'
import { UserRole } from '@/parties/domain/entities/user'

const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.email().optional(),
  document: z.string().min(1).optional(),
  login: z.string().min(3).optional(),
  password: z.string().min(6).optional(),
  role: z.enum(UserRole).optional(),
  active: z.boolean().optional()
})

export class UpdateUserDto extends createZodDto(updateUserSchema) {}

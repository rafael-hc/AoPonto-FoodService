import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'
import { UserRole } from '@/parties/domain/entities/user'

const registerUserSchema = z.object({
  name: z.string().min(1, { error: 'O nome é obrigatório' }),
  email: z
    .email({ error: 'E-mail inválido' })
    .min(1, { error: 'O e-mail é obrigatório' }),
  document: z.string().min(1, { error: 'O CPF é obrigatório' }),
  login: z
    .string()
    .min(3, { error: 'O login deve ter pelo menos 3 caracteres' }),
  password: z
    .string()
    .min(6, { error: 'A senha deve ter pelo menos 6 caracteres' }),
  role: z.enum(UserRole).optional()
})

export class RegisterUserDto extends createZodDto(registerUserSchema) {}

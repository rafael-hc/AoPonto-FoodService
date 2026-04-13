import { ApiProperty } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'
import { UserRole } from '@/parties/domain/entities/user'
import { userRoleSchema } from '@/shared/presentation/dtos/common.dto'

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
    .min(8, { error: 'A senha deve ter pelo menos 8 caracteres' })
    .regex(/[A-Z]/, {
      error: 'A senha deve conter pelo menos uma letra maiúscula'
    })
    .regex(/[a-z]/, {
      error: 'A senha deve conter pelo menos uma letra minúscula'
    })
    .regex(/[0-9]/, { error: 'A senha deve conter pelo menos um número' })
    .regex(/[^A-Za-z0-9]/, {
      error: 'A senha deve conter pelo menos um caractere especial'
    }),
  role: userRoleSchema.optional()
})

export class RegisterUserDto extends createZodDto(registerUserSchema) {
  @ApiProperty({ enum: UserRole, enumName: 'UserRole', required: false })
  declare role?: UserRole
}

import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const authenticateBodySchema = z.object({
  login: z.string().min(1, { error: 'Login do usuário' }),
  password: z.string().min(6, { error: 'Senha de acesso' })
})

export class AuthenticateDto extends createZodDto(authenticateBodySchema) {}

import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const authenticateBodySchema = z.object({
  login: z.string().min(1).describe('Login do usuário'),
  password: z.string().min(6).describe('Senha de acesso'),
});

export class AuthenticateDto extends createZodDto(authenticateBodySchema) {}

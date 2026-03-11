import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { UserRole } from '@/users/domain/entities/user';

const registerUserSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.email('E-mail inválido'),
  login: z.string().min(3, 'O login deve ter pelo menos 3 caracteres'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  role: z.nativeEnum(UserRole).optional(),
});

export class RegisterUserDto extends createZodDto(registerUserSchema) {}

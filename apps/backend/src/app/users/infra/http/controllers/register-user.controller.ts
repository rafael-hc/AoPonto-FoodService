import { Body, Controller, Post, ConflictException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegisterUserUseCase } from '@/users/domain/use-cases/register-user.use-case';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { UserAlreadyExistsError } from '@/users/domain/errors/user-already-exists-error';

@ApiTags('users')
@Controller('users')
export class RegisterUserController {
  // O Use Case será injetado pelo Nest via Factory
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  @Post()
  async handle(@Body() body: RegisterUserDto) {
    const { name, email, login, password, role } = body;

    try {
      const { user, contact } = await this.registerUserUseCase.execute({
        name,
        email,
        login,
        password,
        role,
      });

      return {
        id: user.id,
        login: user.login,
        role: user.role,
        contact: {
          id: contact.id,
          name: contact.name,
          email: contact.email,
        },
      };
    } catch (err) {
      if (err instanceof UserAlreadyExistsError) {
        throw new ConflictException(err.message);
      }

      throw err;
    }
  }
}

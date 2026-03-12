import { Body, ConflictException, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UserAlreadyExistsError } from '@/users/domain/errors/user-already-exists-error'
import { RegisterUserUseCase } from '@/users/domain/use-cases/register-user.use-case'
import type { RegisterUserDto } from '../dtos/register-user.dto'

@ApiTags('users')
@Controller('users')
export class RegisterUserController {
  // O Use Case será injetado pelo Nest via Factory
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  @Post()
  async handle(@Body() body: RegisterUserDto) {
    const { name, email, document, login, password, role } = body

    try {
      const { user, contact } = await this.registerUserUseCase.execute({
        name,
        email,
        document,
        login,
        password,
        role
      })

      return {
        id: user.id,
        login: user.login,
        role: user.role,
        contact: {
          id: contact.id,
          name: contact.name,
          email: contact.email,
          document: contact.document
        }
      }
    } catch (err) {
      if (err instanceof UserAlreadyExistsError) {
        throw new ConflictException(err.message)
      }

      throw err
    }
  }
}

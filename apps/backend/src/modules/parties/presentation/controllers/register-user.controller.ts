import { Body, ConflictException, Controller, Post } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { RegisterUserUseCase } from '@/parties/application/use-cases/register-user.use-case'
import { UserAlreadyExistsError } from '@/parties/domain/errors/user-already-exists-error'
import { RegisterUserDto } from '../dtos/register-user.dto'
import { UserResponseDto } from '../dtos/user-response.dto'

@ApiTags('users')
@Controller('users')
export class RegisterUserController {
  // O Use Case será injetado pelo Nest via Factory
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  @Post()
  @ApiOkResponse({ type: UserResponseDto })
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

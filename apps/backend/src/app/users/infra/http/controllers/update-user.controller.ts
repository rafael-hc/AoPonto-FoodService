import {
  Body,
  Controller,
  Put,
  Param,
  NotFoundException,
  ConflictException
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UpdateUserUseCase } from '@/users/domain/use-cases/update-user.use-case'
import { UpdateUserDto } from '../dtos/update-user.dto'
import { ResourceNotFoundError } from '@/users/domain/errors/resource-not-found-error'
import { UserAlreadyExistsError } from '@/users/domain/errors/user-already-exists-error'

@ApiTags('users')
@Controller('users/:id')
export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  @Put()
  async handle(@Param('id') id: string, @Body() body: UpdateUserDto) {
    try {
      const { user } = await this.updateUserUseCase.execute({
        id,
        ...body
      })

      return {
        id: user.id,
        login: user.login,
        role: user.role,
        active: user.active,
        name: user.name,
        email: user.email,
        document: user.document
      }
    } catch (err) {
      if (err instanceof ResourceNotFoundError) {
        throw new NotFoundException(err.message)
      }

      if (err instanceof UserAlreadyExistsError) {
        throw new ConflictException(err.message)
      }

      throw err
    }
  }
}

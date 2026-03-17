import {
  Body,
  ConflictException,
  Controller,
  NotFoundException,
  Param,
  Put
} from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { UpdateUserUseCase } from '@/parties/application/use-cases/update-user.use-case'
import { ResourceNotFoundError } from '@/parties/domain/errors/resource-not-found-error'
import { UserAlreadyExistsError } from '@/parties/domain/errors/user-already-exists-error'
import { UpdateUserDto } from '../dtos/update-user.dto'
import { UserResponseDto } from '../dtos/user-response.dto'

@ApiTags('users')
@Controller('users/:id')
export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  @Put()
  @ApiOkResponse({ type: UserResponseDto })
  async handle(@Param('id') id: string, @Body() body: UpdateUserDto) {
    try {
      const { user, contact } = await this.updateUserUseCase.execute({
        id,
        ...body
      })

      return {
        id: user.id,
        login: user.login,
        role: user.role,
        active: user.active,
        contact: {
          id: contact?.id,
          name: contact?.name,
          email: contact?.email,
          document: contact?.document
        }
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

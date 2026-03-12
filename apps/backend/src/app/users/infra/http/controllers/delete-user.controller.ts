import {
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ResourceNotFoundError } from '@/users/domain/errors/resource-not-found-error'
import { DeleteUserUseCase } from '@/users/domain/use-cases/delete-user.use-case'

@ApiTags('users')
@Controller('users/:id')
export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') id: string) {
    try {
      await this.deleteUserUseCase.execute({ id })
    } catch (err) {
      if (err instanceof ResourceNotFoundError) {
        throw new NotFoundException(err.message)
      }

      throw err
    }
  }
}

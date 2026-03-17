import {
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { DeleteUserUseCase } from '@/parties/application/use-cases/delete-user.use-case'
import { ResourceNotFoundError } from '@/parties/domain/errors/resource-not-found-error'

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

import { Controller, Get } from '@nestjs/common'
import { FetchUsersUseCase } from '@/users/domain/use-cases/fetch-users.use-case'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('users')
@Controller('users')
export class FetchUsersController {
  constructor(private fetchUsers: FetchUsersUseCase) {}

  @Get()
  async handle() {
    const { users } = await this.fetchUsers.execute()

    return {
      users: users.map((user) => ({
        id: user.id,
        login: user.login,
        role: user.role,
        active: user.active,
        name: user.name,
        email: user.email,
        document: user.document,
        contactId: user.contactId
      }))
    }
  }
}

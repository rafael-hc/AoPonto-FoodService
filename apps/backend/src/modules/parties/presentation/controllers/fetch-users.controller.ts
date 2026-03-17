import { Controller, Get } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { FetchUsersUseCase } from '@/parties/application/use-cases/fetch-users.use-case'
import { FetchUsersResponseDto } from '../dtos/user-response.dto'

@ApiTags('users')
@Controller('users')
export class FetchUsersController {
  constructor(private fetchUsers: FetchUsersUseCase) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários',
    type: FetchUsersResponseDto
  })
  async handle() {
    const { usersWithContacts } = await this.fetchUsers.execute()

    return {
      users: usersWithContacts.map(({ user, contact }) => ({
        id: user.id,
        login: user.login,
        role: user.role,
        active: user.active,
        name: contact?.name,
        email: contact?.email,
        document: contact?.document,
        contactId: user.contactId
      }))
    }
  }
}

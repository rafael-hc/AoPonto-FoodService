import { Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'
import { UserRole } from '@/users/domain/entities/user'
import { FetchUsersByRoleUseCase } from '@/users/domain/use-cases/fetch-users-by-role.use-case'
import { ApiTags } from '@nestjs/swagger'

const fetchByRoleSchema = z.object({
  role: z.enum(UserRole)
})

@ApiTags('users')
@Controller('users')
export class FetchUsersByRoleController {
  constructor(private fetchUsersByRole: FetchUsersByRoleUseCase) {}

  @Get()
  async handle(@Query('role') role: string) {
    const parsed = fetchByRoleSchema.parse({ role })

    const { users } = await this.fetchUsersByRole.execute({
      role: parsed.role
    })

    return {
      users: users.map((user) => ({
        id: user.id,
        login: user.login,
        role: user.role,
        contactId: user.contactId
      }))
    }
  }
}

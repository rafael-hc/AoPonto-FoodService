import { Controller, Get, NotFoundException, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { PrismaService } from '@/users/infra/database/prisma/prisma.service'
import {
  CurrentUser,
  type UserPayload
} from '../decorators/current-user.decorator'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'

@ApiTags('users')
@ApiBearerAuth()
@Controller('/me')
export class GetProfileController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Perfil do usuário logado',
    schema: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            login: { type: 'string' },
            role: { type: 'string' },
            contact: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                email: { type: 'string' }
              }
            }
          }
        }
      }
    }
  })
  async handle(@CurrentUser() userPayload: UserPayload) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userPayload.sub
      },
      include: {
        contact: true
      }
    })

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.')
    }

    return {
      user: {
        id: user.id,
        login: user.login,
        role: user.role,
        contact: {
          id: user.contact.id,
          name: user.contact.name,
          email: user.contact.email
        }
      }
    }
  }
}

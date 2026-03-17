import { Controller, Get, NotFoundException, UseGuards } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { GetProfileResponseDto } from '@/parties/presentation/dtos/user-response.dto'
import { PrismaService } from '@/shared/database/prisma/prisma.service'
import {
  CurrentUser,
  type UserPayload
} from '../decorators/current-user.decorator'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'

@ApiBearerAuth()
@Controller('/me')
export class GetProfileController {
  constructor(private prisma: PrismaService) {}

  @ApiTags('session')
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Obter perfil',
    description: 'Retorna os dados do usuário autenticado.'
  })
  @ApiResponse({
    status: 200,
    description: 'Perfil do usuário logado',
    type: GetProfileResponseDto
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

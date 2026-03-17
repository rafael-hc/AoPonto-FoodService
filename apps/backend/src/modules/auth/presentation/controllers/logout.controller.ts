import { Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import type { Response } from 'express'

@ApiTags('session')
@Controller('/session/logout')
export class LogoutController {
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Encerrar sessão',
    description: 'Limpa os cookies de autenticação.'
  })
  @ApiResponse({ status: 200, description: 'Logout realizado com sucesso' })
  async handle(@Res() response: Response) {
    response.clearCookie('access_token')
    response.clearCookie('refresh_token')

    return response.send({ message: 'Logout realizado com sucesso' })
  }
}

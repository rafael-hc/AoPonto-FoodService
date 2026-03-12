import { Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import type { Response } from 'express'

@ApiTags('sessions')
@Controller('/sessions/logout')
export class LogoutController {
  @Post()
  @HttpCode(HttpStatus.OK)
  async handle(@Res() response: Response) {
    response.clearCookie('access_token')
    response.clearCookie('refresh_token')

    return response.send({ message: 'Logout realizado com sucesso' })
  }
}

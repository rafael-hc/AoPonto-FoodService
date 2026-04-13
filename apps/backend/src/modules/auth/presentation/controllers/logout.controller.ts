import {
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import type { Request, Response } from 'express'
import type Redis from 'ioredis'

@ApiTags('session')
@Controller('/session/logout')
export class LogoutController {
  constructor(@Inject('REDIS_CLIENT') private redis: Redis) {}
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Encerrar sessão',
    description: 'Limpa os cookies de autenticação.'
  })
  @ApiResponse({ status: 200, description: 'Logout realizado com sucesso' })
  async handle(@Req() request: Request, @Res() response: Response) {
    const token =
      request.cookies?.access_token ||
      request.headers.authorization?.split(' ')[1]

    if (token) {
      // Adiciona o token à blacklist no Redis por 1 hora (tempo seguro para expiração do JWT)
      await this.redis.set(`blacklist:${token}`, 'true', 'EX', 3600)
    }

    response.clearCookie('access_token')
    response.clearCookie('refresh_token')

    return response.send({ message: 'Logout realizado com sucesso' })
  }
}

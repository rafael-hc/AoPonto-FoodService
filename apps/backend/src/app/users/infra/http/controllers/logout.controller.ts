import { Controller, Post, Res, HttpCode, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sessions')
@Controller('/sessions/logout')
export class LogoutController {
  @Post()
  @HttpCode(HttpStatus.OK)
  async handle(@Res() response: Response) {
    response.clearCookie('access_token');
    response.clearCookie('refresh_token');

    return response.send({ message: 'Logout realizado com sucesso' });
  }
}

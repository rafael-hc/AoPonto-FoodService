import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticateUserUseCase } from '@/users/domain/use-cases/authenticate-user.use-case';
import { WrongCredentialsError } from '@/users/domain/errors/wrong-credentials-error';
import { AuthenticateDto } from '../dtos/authenticate.dto';

@ApiTags('sessions')
@Controller('/sessions')
export class AuthenticateController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  @Post()
  @HttpCode(200)
  async handle(
    @Body() body: AuthenticateDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { login, password } = body;

    try {
      const { accessToken, refreshToken } =
        await this.authenticateUserUseCase.execute({
          login,
          password,
        });

      response.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24, // 1 dia
      });

      response.cookie('refresh_token', refreshToken, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
      });

      return {
        message: 'Authenticated successfully',
      };
    } catch (error) {
      if (error instanceof WrongCredentialsError) {
        throw new UnauthorizedException(error.message);
      }

      throw error;
    }
  }
}

import {
  Controller,
  HttpCode,
  Patch,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { RefreshTokenUseCase } from '@/users/domain/use-cases/refresh-token.use-case';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sessions')
@Controller('/sessions/refresh')
export class RefreshTokenController {
  constructor(
    private refreshTokenUseCase: RefreshTokenUseCase,
    private jwtService: JwtService,
  ) {}

  @Patch()
  @HttpCode(200)
  async handle(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies['refresh_token'];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }

    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: 'your-secret-key', // TODO: Use environment variable
      });

      const userId = payload.sub;

      const { accessToken, refreshToken: newRefreshToken } =
        await this.refreshTokenUseCase.execute({
          userId,
        });

      response.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24, // 1 dia
      });

      response.cookie('refresh_token', newRefreshToken, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
      });

      return {
        message: 'Token refreshed successfully',
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}

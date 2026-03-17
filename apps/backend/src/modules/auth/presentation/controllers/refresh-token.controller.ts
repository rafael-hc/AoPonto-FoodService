import {
  Controller,
  HttpCode,
  Patch,
  Req,
  Res,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import type { Request, Response } from 'express'
import { RefreshTokenUseCase } from '../../application/use-cases/refresh-token.use-case'

@ApiTags('session')
@Controller('/session/refresh')
export class RefreshTokenController {
  constructor(
    private refreshTokenUseCase: RefreshTokenUseCase,
    private jwtService: JwtService
  ) {}

  @Patch()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Atualizar token',
    description: 'Gera um novo token de acesso usando o refresh token.'
  })
  @ApiResponse({ status: 200, description: 'Token atualizado com sucesso' })
  @ApiResponse({ status: 401, description: 'Token inválido ou ausente' })
  async handle(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    const refreshToken = request.cookies.refresh_token

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing')
    }

    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: 'your-secret-key' // TODO: Use environment variable
      })

      const userId = payload.sub

      const { accessToken, refreshToken: newRefreshToken } =
        await this.refreshTokenUseCase.execute({
          userId
        })

      response.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 // 1 dia
      })

      response.cookie('refresh_token', newRefreshToken, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 dias
      })

      return {
        message: 'Token refreshed successfully'
      }
    } catch (_error) {
      throw new UnauthorizedException('Invalid refresh token')
    }
  }
}

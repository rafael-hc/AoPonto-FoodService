import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UnauthorizedException
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import type { Response } from 'express'
import { WrongCredentialsError } from '@/auth/domain/errors/wrong-credentials-error'
import { AuthenticateUserUseCase } from '../../application/use-cases/authenticate-user.use-case'
import { Public } from '../decorators/public.decorator'
import {
  AuthenticateDto,
  AuthenticateResponseDto
} from '../dtos/authenticate.dto'

@ApiTags('session')
@Public()
@Controller('session')
export class AuthenticateController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Autenticar usuário',
    description: 'Realiza o login e gera os tokens de acesso.'
  })
  @ApiResponse({
    status: 200,
    description: 'Autenticado com sucesso',
    type: AuthenticateResponseDto
  })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async handle(
    @Body() body: AuthenticateDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const { login, password } = body

    try {
      const { accessToken, refreshToken, passwordChangeRequired } =
        await this.authenticateUserUseCase.execute({
          login,
          password
        })

      response.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 // 1 dia
      })

      response.cookie('refresh_token', refreshToken, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 dias
      })

      return {
        message: 'Authenticated successfully',
        passwordChangeRequired
      }
    } catch (error) {
      if (error instanceof WrongCredentialsError) {
        throw new UnauthorizedException(error.message)
      }

      throw error
    }
  }
}

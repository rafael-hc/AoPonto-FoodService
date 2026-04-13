import {
  type CanActivate,
  type ExecutionContext,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import type { Request } from 'express'
import type Redis from 'ioredis'
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    @Inject('REDIS_CLIENT') private redis: Redis
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const token = this.extractToken(request)

    if (!token) {
      throw new UnauthorizedException()
    }

    // 1. Verificar se o token está na blacklist (Logout) no Redis
    const isBlacklisted = await this.redis.get(`blacklist:${token}`)
    if (isBlacklisted) {
      throw new UnauthorizedException('Token invalidado por logout.')
    }

    try {
      const secret = process.env.JWT_SECRET
      if (!secret) {
        throw new InternalServerErrorException(
          'JWT_SECRET must be defined in environment'
        )
      }

      const payload = await this.jwtService.verifyAsync(token, {
        secret
      })

      request.user = payload
    } catch {
      throw new UnauthorizedException()
    }

    return true
  }

  private extractToken(request: Request): string | undefined {
    const token = request.cookies.access_token

    if (token) {
      return token
    }

    const [type, headerToken] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? headerToken : undefined
  }
}

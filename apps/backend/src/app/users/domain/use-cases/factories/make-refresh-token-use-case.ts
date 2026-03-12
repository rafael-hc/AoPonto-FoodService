import type { JwtService } from '@nestjs/jwt'
import { JwtEncrypter } from '@/users/infra/cryptography/jwt-encrypter'
import type { PrismaService } from '@/users/infra/database/prisma/prisma.service'
import { RefreshTokenUseCase } from '../refresh-token.use-case'

export function makeRefreshTokenUseCase(
  _prisma: PrismaService,
  jwtService: JwtService
) {
  const encrypter = new JwtEncrypter(jwtService)
  const useCase = new RefreshTokenUseCase(encrypter)

  return useCase
}

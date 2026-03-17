import type { JwtService } from '@nestjs/jwt'
import { JwtEncrypter } from '@/auth/infrastructure/cryptography/jwt-encrypter'
import { RefreshTokenUseCase } from '../refresh-token.use-case'

export function makeRefreshTokenUseCase(jwtService: JwtService) {
  const encrypter = new JwtEncrypter(jwtService)
  const useCase = new RefreshTokenUseCase(encrypter)

  return useCase
}

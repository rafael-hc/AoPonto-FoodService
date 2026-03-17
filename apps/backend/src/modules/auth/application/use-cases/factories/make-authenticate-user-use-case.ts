import type { JwtService } from '@nestjs/jwt'
import { BcryptHasher } from '@/auth/infrastructure/cryptography/bcrypt-hasher'
import { JwtEncrypter } from '@/auth/infrastructure/cryptography/jwt-encrypter'
import type { UsersRepository } from '@/parties/domain/repositories/users-repository'
import { AuthenticateUserUseCase } from '../authenticate-user.use-case'

export function makeAuthenticateUserUseCase(
  usersRepository: UsersRepository,
  jwtService: JwtService
) {
  const hashGenerator = new BcryptHasher()
  const encrypter = new JwtEncrypter(jwtService)
  const useCase = new AuthenticateUserUseCase(
    usersRepository,
    hashGenerator,
    encrypter
  )

  return useCase
}

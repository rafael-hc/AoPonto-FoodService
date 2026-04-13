import type { Encrypter } from '@/auth/domain/cryptography/encrypter'
import type { HashGenerator } from '@/auth/domain/cryptography/hash-generator'
import { AccountBlockedError } from '@/auth/domain/errors/account-blocked-error'
import { WrongCredentialsError } from '@/auth/domain/errors/wrong-credentials-error'
import type { UsersRepository } from '@/parties/domain/repositories/users-repository'

interface AuthenticateUserUseCaseRequest {
  login: string
  password: string
}

interface AuthenticateUserUseCaseResponse {
  accessToken: string
  refreshToken: string
  passwordChangeRequired: boolean
}

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
    private encrypter: Encrypter
  ) {}

  async execute({
    login,
    password
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByLogin(login)

    if (!user || user.deletedAt) {
      throw new WrongCredentialsError()
    }

    if (user.isLocked()) {
      throw new AccountBlockedError(user.lockUntil)
    }

    const isPasswordValid = await this.hashGenerator.compare(
      password,
      user.password
    )

    if (!isPasswordValid) {
      user.lockAccount() // Bloqueia por 5 minutos (padrão da entidade) se chegar a 5 tentativas
      await this.usersRepository.save(user)

      // Se acabou de bloquear, retorna erro de bloqueio
      if (user.isLocked()) {
        throw new AccountBlockedError(user.lockUntil)
      }

      throw new WrongCredentialsError()
    }

    // Resetar falhas em caso de sucesso
    if (user.failureAttempts > 0) {
      user.resetFailureAttempts()
      await this.usersRepository.save(user)
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id
    })

    const refreshToken = await this.encrypter.encrypt(
      {
        sub: user.id
      },
      {
        expiresIn: '7d'
      }
    )

    return {
      accessToken,
      refreshToken,
      passwordChangeRequired: user.passwordChangeRequired
    }
  }
}

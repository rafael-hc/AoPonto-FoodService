import type { Encrypter } from '../cryptography/encrypter'

interface RefreshTokenUseCaseRequest {
  userId: string
}

interface RefreshTokenUseCaseResponse {
  accessToken: string
  refreshToken: string
}

export class RefreshTokenUseCase {
  constructor(private encrypter: Encrypter) {}

  async execute({
    userId
  }: RefreshTokenUseCaseRequest): Promise<RefreshTokenUseCaseResponse> {
    const accessToken = await this.encrypter.encrypt({
      sub: userId
    })

    const refreshToken = await this.encrypter.encrypt(
      {
        sub: userId
      },
      {
        expiresIn: '7d'
      }
    )

    return {
      accessToken,
      refreshToken
    }
  }
}

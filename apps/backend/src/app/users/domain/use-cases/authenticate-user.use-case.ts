import { UsersRepository } from '../repositories/users-repository';
import { HashGenerator } from '../cryptography/hash-generator';
import { Encrypter } from '../cryptography/encrypter';
import { WrongCredentialsError } from '../errors/wrong-credentials-error';

interface AuthenticateUserUseCaseRequest {
  login: string;
  password: string;
}

interface AuthenticateUserUseCaseResponse {
  accessToken: string;
  refreshToken: string;
}

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
    private encrypter: Encrypter,
  ) {}

  async execute({
    login,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByLogin(login);

    if (!user) {
      throw new WrongCredentialsError();
    }

    const isPasswordValid = await this.hashGenerator.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new WrongCredentialsError();
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id,
    });

    const refreshToken = await this.encrypter.encrypt(
      {
        sub: user.id,
      },
      {
        expiresIn: '7d',
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}

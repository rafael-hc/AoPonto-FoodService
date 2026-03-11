import { PrismaUsersRepository } from '@/users/infra/database/prisma/repositories/prisma-users-repository';
import { PrismaService } from '@/users/infra/database/prisma/prisma.service';
import { BcryptHasher } from '@/users/infra/cryptography/bcrypt-hasher';
import { JwtEncrypter } from '@/users/infra/cryptography/jwt-encrypter';
import { AuthenticateUserUseCase } from '../authenticate-user.use-case';
import { JwtService } from '@nestjs/jwt';

export function makeAuthenticateUserUseCase(
  prisma: PrismaService,
  jwtService: JwtService,
) {
  const usersRepository = new PrismaUsersRepository(prisma);
  const hashGenerator = new BcryptHasher();
  const encrypter = new JwtEncrypter(jwtService);
  const useCase = new AuthenticateUserUseCase(
    usersRepository,
    hashGenerator,
    encrypter,
  );

  return useCase;
}

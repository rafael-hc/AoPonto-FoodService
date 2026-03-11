import { PrismaUsersRepository } from '@/users/infra/database/prisma/repositories/prisma-users-repository';
import { PrismaService } from '@/users/infra/database/prisma/prisma.service';
import { JwtEncrypter } from '@/users/infra/cryptography/jwt-encrypter';
import { RefreshTokenUseCase } from '../refresh-token.use-case';
import { JwtService } from '@nestjs/jwt';

export function makeRefreshTokenUseCase(
  prisma: PrismaService,
  jwtService: JwtService,
) {
  const encrypter = new JwtEncrypter(jwtService);
  const useCase = new RefreshTokenUseCase(encrypter);

  return useCase;
}

import { PrismaUsersRepository } from '@/users/infra/database/prisma/repositories/prisma-users-repository';
import { PrismaService } from '@/users/infra/database/prisma/prisma.service';
import { FetchUsersByRoleUseCase } from '../fetch-users-by-role.use-case';

export function makeFetchUsersByRoleUseCase(prisma: PrismaService) {
  const usersRepository = new PrismaUsersRepository(prisma);
  const useCase = new FetchUsersByRoleUseCase(usersRepository);

  return useCase;
}

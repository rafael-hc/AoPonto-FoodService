import { PrismaUsersRepository } from '@/users/infra/database/prisma/repositories/prisma-users-repository'
import { PrismaService } from '@/users/infra/database/prisma/prisma.service'
import { FetchUsersUseCase } from '../fetch-users.use-case'

export function makeFetchUsersUseCase(prisma: PrismaService) {
  const usersRepository = new PrismaUsersRepository(prisma)
  const useCase = new FetchUsersUseCase(usersRepository)

  return useCase
}

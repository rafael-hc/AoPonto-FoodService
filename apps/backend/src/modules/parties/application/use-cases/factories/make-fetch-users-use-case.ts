import { PrismaContactsRepository } from '@/parties/infrastructure/database/prisma/repositories/prisma-contacts-repository'
import { PrismaUsersRepository } from '@/parties/infrastructure/database/prisma/repositories/prisma-users-repository'
import type { PrismaService } from '@/shared/database/prisma/prisma.service'
import { FetchUsersUseCase } from '../fetch-users.use-case'

export function makeFetchUsersUseCase(prisma: PrismaService) {
  const usersRepository = new PrismaUsersRepository(prisma)
  const contactsRepository = new PrismaContactsRepository(prisma)
  const useCase = new FetchUsersUseCase(usersRepository, contactsRepository)

  return useCase
}

import { PrismaUsersRepository } from '@/users/infra/database/prisma/repositories/prisma-users-repository'
import { PrismaContactsRepository } from '@/users/infra/database/prisma/repositories/prisma-contacts-repository'
import { PrismaService } from '@/users/infra/database/prisma/prisma.service'
import { DeleteUserUseCase } from '../delete-user.use-case'

export function makeDeleteUserUseCase(prisma: PrismaService) {
  const usersRepository = new PrismaUsersRepository(prisma)
  const contactsRepository = new PrismaContactsRepository(prisma)

  return new DeleteUserUseCase(usersRepository, contactsRepository)
}

import { PrismaContactsRepository } from '@/parties/infrastructure/database/prisma/repositories/prisma-contacts-repository'
import { PrismaUsersRepository } from '@/parties/infrastructure/database/prisma/repositories/prisma-users-repository'
import { PrismaService } from '@/shared/database/prisma/prisma.service'
import { DeleteUserUseCase } from '../delete-user.use-case'

export function makeDeleteUserUseCase(prisma: PrismaService) {
  const usersRepository = new PrismaUsersRepository(prisma)
  const contactsRepository = new PrismaContactsRepository(prisma)

  return new DeleteUserUseCase(usersRepository, contactsRepository)
}

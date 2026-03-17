import { BcryptHasher } from '@/auth/infrastructure/cryptography/bcrypt-hasher'
import { PrismaContactsRepository } from '@/parties/infrastructure/database/prisma/repositories/prisma-contacts-repository'
import { PrismaUsersRepository } from '@/parties/infrastructure/database/prisma/repositories/prisma-users-repository'
import { PrismaService } from '@/shared/database/prisma/prisma.service'
import { UpdateUserUseCase } from '../update-user.use-case'

export function makeUpdateUserUseCase(prisma: PrismaService) {
  const usersRepository = new PrismaUsersRepository(prisma)
  const contactsRepository = new PrismaContactsRepository(prisma)
  const hashGenerator = new BcryptHasher()

  return new UpdateUserUseCase(
    usersRepository,
    contactsRepository,
    hashGenerator
  )
}

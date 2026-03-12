import { BcryptHasher } from '@/users/infra/cryptography/bcrypt-hasher'
import type { PrismaService } from '@/users/infra/database/prisma/prisma.service'
import { PrismaContactsRepository } from '@/users/infra/database/prisma/repositories/prisma-contacts-repository'
import { PrismaUsersRepository } from '@/users/infra/database/prisma/repositories/prisma-users-repository'
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

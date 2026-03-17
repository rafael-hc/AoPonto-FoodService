import { BcryptHasher } from '@/auth/infrastructure/cryptography/bcrypt-hasher'
import { PrismaContactsRepository } from '@/parties/infrastructure/database/prisma/repositories/prisma-contacts-repository'
import { PrismaUsersRepository } from '@/parties/infrastructure/database/prisma/repositories/prisma-users-repository'
import type { PrismaService } from '@/shared/database/prisma/prisma.service'
import { RegisterUserUseCase } from '../register-user.use-case'

export function makeRegisterUserUseCase(prisma: PrismaService) {
  const usersRepository = new PrismaUsersRepository(prisma)
  const contactsRepository = new PrismaContactsRepository(prisma)
  const hashGenerator = new BcryptHasher()
  const useCase = new RegisterUserUseCase(
    usersRepository,
    contactsRepository,
    hashGenerator
  )

  return useCase
}

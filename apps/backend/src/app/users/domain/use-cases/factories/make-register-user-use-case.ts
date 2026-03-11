import { PrismaUsersRepository } from '@/users/infra/database/prisma/repositories/prisma-users-repository';
import { PrismaContactsRepository } from '@/users/infra/database/prisma/repositories/prisma-contacts-repository';
import { BcryptHasher } from '@/users/infra/cryptography/bcrypt-hasher';
import { RegisterUserUseCase } from '../register-user.use-case';
import { PrismaService } from '@/users/infra/database/prisma/prisma.service';

export function makeRegisterUserUseCase(prisma: PrismaService) {
  const usersRepository = new PrismaUsersRepository(prisma);
  const contactsRepository = new PrismaContactsRepository(prisma);
  const hashGenerator = new BcryptHasher();
  const useCase = new RegisterUserUseCase(
    usersRepository,
    contactsRepository,
    hashGenerator,
  );

  return useCase;
}

import { Module } from '@nestjs/common'
import { BcryptHasher } from '@/auth/infrastructure/cryptography/bcrypt-hasher'
import { DeleteUserUseCase } from './application/use-cases/delete-user.use-case'
import { FetchUsersUseCase } from './application/use-cases/fetch-users.use-case'
import { RegisterUserUseCase } from './application/use-cases/register-user.use-case'
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case'
import { ContactsRepository } from './domain/repositories/contacts-repository'
import { UsersRepository } from './domain/repositories/users-repository'
import { PrismaContactsRepository } from './infrastructure/database/prisma/repositories/prisma-contacts-repository'
import { PrismaUsersRepository } from './infrastructure/database/prisma/repositories/prisma-users-repository'
import { DeleteUserController } from './presentation/controllers/delete-user.controller'
import { FetchUsersController } from './presentation/controllers/fetch-users.controller'
import { RegisterUserController } from './presentation/controllers/register-user.controller'
import { UpdateUserController } from './presentation/controllers/update-user.controller'

@Module({
  imports: [],
  controllers: [
    RegisterUserController,
    FetchUsersController,
    UpdateUserController,
    DeleteUserController
  ],
  providers: [
    {
      provide: ContactsRepository,
      useClass: PrismaContactsRepository
    },
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository
    },
    {
      provide: RegisterUserUseCase,
      useFactory: (
        usersRepository: UsersRepository,
        contactsRepository: ContactsRepository
      ) => {
        const hashGenerator = new BcryptHasher()
        return new RegisterUserUseCase(
          usersRepository,
          contactsRepository,
          hashGenerator
        )
      },
      inject: [UsersRepository, ContactsRepository]
    },
    {
      provide: FetchUsersUseCase,
      useFactory: (
        usersRepository: UsersRepository,
        contactsRepository: ContactsRepository
      ) => {
        return new FetchUsersUseCase(usersRepository, contactsRepository)
      },
      inject: [UsersRepository, ContactsRepository]
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (
        usersRepository: UsersRepository,
        contactsRepository: ContactsRepository
      ) => {
        const hashGenerator = new BcryptHasher()
        return new UpdateUserUseCase(
          usersRepository,
          contactsRepository,
          hashGenerator
        )
      },
      inject: [UsersRepository, ContactsRepository]
    },
    {
      provide: DeleteUserUseCase,
      useFactory: (
        usersRepository: UsersRepository,
        contactsRepository: ContactsRepository
      ) => {
        return new DeleteUserUseCase(usersRepository, contactsRepository)
      },
      inject: [UsersRepository, ContactsRepository]
    }
  ],
  exports: [UsersRepository, ContactsRepository]
})
export class PartiesModule {}

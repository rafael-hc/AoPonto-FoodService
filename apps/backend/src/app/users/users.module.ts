import { Module } from '@nestjs/common'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { ContactsRepository } from './domain/repositories/contacts-repository'
import { UsersRepository } from './domain/repositories/users-repository'
import { AuthenticateUserUseCase } from './domain/use-cases/authenticate-user.use-case'
import { DeleteUserUseCase } from './domain/use-cases/delete-user.use-case'
import { makeAuthenticateUserUseCase } from './domain/use-cases/factories/make-authenticate-user-use-case'
import { makeDeleteUserUseCase } from './domain/use-cases/factories/make-delete-user-use-case'
import { makeFetchUsersUseCase } from './domain/use-cases/factories/make-fetch-users-use-case'
import { makeRefreshTokenUseCase } from './domain/use-cases/factories/make-refresh-token-use-case'
import { makeRegisterUserUseCase } from './domain/use-cases/factories/make-register-user-use-case'
import { makeUpdateUserUseCase } from './domain/use-cases/factories/make-update-user-use-case'
import { FetchUsersUseCase } from './domain/use-cases/fetch-users.use-case'
import { RefreshTokenUseCase } from './domain/use-cases/refresh-token.use-case'
import { RegisterUserUseCase } from './domain/use-cases/register-user.use-case'
import { UpdateUserUseCase } from './domain/use-cases/update-user.use-case'
import { PrismaService } from './infra/database/prisma/prisma.service'
import { PrismaContactsRepository } from './infra/database/prisma/repositories/prisma-contacts-repository'
import { PrismaUsersRepository } from './infra/database/prisma/repositories/prisma-users-repository'
import { AuthenticateController } from './infra/http/controllers/authenticate.controller'
import { DeleteUserController } from './infra/http/controllers/delete-user.controller'
import { FetchUsersController } from './infra/http/controllers/fetch-users.controller'
import { GetProfileController } from './infra/http/controllers/get-profile.controller'
import { LogoutController } from './infra/http/controllers/logout.controller'
import { RefreshTokenController } from './infra/http/controllers/refresh-token.controller'
import { RegisterUserController } from './infra/http/controllers/register-user.controller'
import { UpdateUserController } from './infra/http/controllers/update-user.controller'

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'your-secret-key', // TODO: Use environment variable
      signOptions: { expiresIn: '10m' } // Token de acesso curto
    })
  ],
  controllers: [
    RegisterUserController,
    FetchUsersController,
    AuthenticateController,
    RefreshTokenController,
    GetProfileController,
    LogoutController,
    UpdateUserController,
    DeleteUserController
  ],
  providers: [
    PrismaService,
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
      useFactory: (prisma: PrismaService) => {
        return makeRegisterUserUseCase(prisma)
      },
      inject: [PrismaService]
    },
    {
      provide: FetchUsersUseCase,
      useFactory: (prisma: PrismaService) => {
        return makeFetchUsersUseCase(prisma)
      },
      inject: [PrismaService]
    },
    {
      provide: AuthenticateUserUseCase,
      useFactory: (prisma: PrismaService, jwtService: JwtService) => {
        return makeAuthenticateUserUseCase(prisma, jwtService)
      },
      inject: [PrismaService, JwtService]
    },
    {
      provide: RefreshTokenUseCase,
      useFactory: (prisma: PrismaService, jwtService: JwtService) => {
        return makeRefreshTokenUseCase(prisma, jwtService)
      },
      inject: [PrismaService, JwtService]
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (prisma: PrismaService) => {
        return makeUpdateUserUseCase(prisma)
      },
      inject: [PrismaService]
    },
    {
      provide: DeleteUserUseCase,
      useFactory: (prisma: PrismaService) => {
        return makeDeleteUserUseCase(prisma)
      },
      inject: [PrismaService]
    }
  ]
})
export class UsersModule {}
